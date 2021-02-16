import { ReadableSignal, Listener, Cache, Accumulator } from 'micro-signals';

export class Tag{
    constructor(private readonly id: string) {
    }
}

export interface TrackingContext<T> {
    tag: Tag;
    //should ths be a WeakReference?
    signal: ReadableSignal<T>
    // should this be a WeakSet?
    signalsWithSubscription: Set<ReadableSignal<unknown>>
}

export const trackingContext = <T>(previous: TrackingContext<unknown>, signal: ReadableSignal<T>): TrackingContext<T> => {
    return {
        tag: previous.tag,
        signalsWithSubscription: previous.signalsWithSubscription,
        signal
    };
};

const signalWithTracking = <T>(previous: TrackingContext<unknown>, signal: ReadableSignal<T>) => {
    const updateContext = trackingContext(previous, signal);
    return new SignalWithTracking(updateContext);
};

export class SignalWithTracking<T> implements ReadableSignal<T> {

    constructor(private readonly trackingContext: TrackingContext<T>) {
    }

    add(listener: Listener<T>, ...tags: any[]): void {
        if (tags === undefined) {
            throw new Error('lets check this');
        }
        const signal = this.signal();
        signal.add(listener, this.trackingContext.tag);
        this.trackingContext.signalsWithSubscription.add(this);
    }

    addOnce(listener: Listener<T>, ...tags: any[]): void {
        if (tags === undefined) {
            throw new Error('lets check this');
        }
        const signal = this.signal();
        signal.addOnce(listener, this.trackingContext.tag);
        this.trackingContext.signalsWithSubscription.add(this);
    }

    remove(listenerOrTag: any): void {
        if (this.trackingContext.tag === listenerOrTag) {
            this.trackingContext.signalsWithSubscription.delete(this);
        }
        this.signal().remove(listenerOrTag);
    }

    cache(cache: Cache<T>): ReadableSignal<T> {
        const cachedSignal = this.trackingContext.signal.cache(cache);
        return signalWithTracking(this.trackingContext, cachedSignal);
    }

    filter<U extends T>(filter: (payload: T) => payload is U): ReadableSignal<U>;
    filter(filter: (payload: T) => boolean): ReadableSignal<T>;
    filter(filter: any): any {
        const filtered = this.signal().filter(filter);
        return signalWithTracking(this.trackingContext, filtered);
    }

    map<U>(transform: (payload: T) => U): ReadableSignal<U> {
        const mappedSignal = this.trackingContext.signal.map(transform);
        return signalWithTracking(this.trackingContext, mappedSignal);
    }

    merge<U>(...signals: ReadableSignal<U>[]): ReadableSignal<T | U> {
        const merged = this.trackingContext.signal.merge(...signals);
        return signalWithTracking(this.trackingContext, merged);
    }

    peek(peekaboo: (payload: T) => void): ReadableSignal<T> {
        this.signal().peek(peekaboo);
        return this;
    }

    promisify(rejectSignal?: ReadableSignal<any>): Promise<T> {
        return this.signal().promisify(rejectSignal);
    }

    readOnly(): ReadableSignal<T> {
        return this;
    }

    reduce<U>(accumulator: Accumulator<T, U>, initialValue: U): ReadableSignal<U> {
        const reducedSignal = this.signal().reduce(accumulator, initialValue);
        return signalWithTracking(this.trackingContext, reducedSignal);
    }

    private signal() {
        return this.trackingContext.signal;
    }
}
