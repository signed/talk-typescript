import { Accumulator, Cache, Listener, ReadableSignal } from 'micro-signals';

export class Tag {
    constructor(private readonly id: string) {
    }

    toString(){
        return `Tag: ${this.id}`;
    }
}

export interface TrackingContext {
    readonly tag: Tag;
    // should this be a WeakSet?
    readonly signalsWithSubscription: Set<ReadableSignal<unknown>>;
    active: boolean;
}

const ensureNoTagsPassed = (tags: any[]) => {
    if (tags.length > 0) {
        throw new Error('lets check why there are already tags');
    }
};

export const trackListenersAddedTo = <T>(signal: ReadableSignal<T>, trackingContext: TrackingContext) => {
    return new SignalWithTracking(signal, trackingContext);
};

export class SignalWithTracking<T> implements ReadableSignal<T> {
    //should this be a WeakReference?
    private readonly wrapped: ReadableSignal<T>;

    constructor(signal: ReadableSignal<T>, readonly trackingContext: TrackingContext) {
        this.wrapped = signal;
    }

    add(listener: Listener<T>, ...tags: any[]): void {
        ensureNoTagsPassed(tags);
        if (!this.trackingContext.active) {
            return;
        }
        const signal = this.wrappedSignal();
        signal.add(listener, this.trackingContext.tag);
        this.trackingContext.signalsWithSubscription.add(this);
    }

    addOnce(listener: Listener<T>, ...tags: any[]): void {
        ensureNoTagsPassed(tags);
        if (!this.trackingContext.active) {
            return;

        }
        const signal = this.wrappedSignal();
        signal.addOnce(listener, this.trackingContext.tag);
        this.trackingContext.signalsWithSubscription.add(this);
    }

    remove(listenerOrTag: any): void {
        if (this.trackingContext.tag === listenerOrTag) {
            this.trackingContext.signalsWithSubscription.delete(this);
        }
        this.wrappedSignal().remove(listenerOrTag);
    }

    cache(cache: Cache<T>): ReadableSignal<T> {
        const cachedSignal = this.wrappedSignal().cache(cache);
        return trackListenersAddedTo(cachedSignal, this.trackingContext);
    }

    filter<U extends T>(filter: (payload: T) => payload is U): ReadableSignal<U>;
    filter(filter: (payload: T) => boolean): ReadableSignal<T>;
    filter(filter: any): any {
        const filtered = this.wrappedSignal().filter(filter);
        return trackListenersAddedTo(filtered, this.trackingContext);
    }

    map<U>(transform: (payload: T) => U): ReadableSignal<U> {
        const mappedSignal = this.wrappedSignal().map(transform);
        return trackListenersAddedTo(mappedSignal, this.trackingContext);
    }

    merge<U>(...signals: ReadableSignal<U>[]): ReadableSignal<T | U> {
        const merged = this.wrappedSignal().merge(...signals);
        return trackListenersAddedTo(merged, this.trackingContext);
    }

    peek(peekaboo: (payload: T) => void): ReadableSignal<T> {
        this.wrappedSignal().peek(peekaboo);
        return this;
    }

    promisify(rejectSignal?: ReadableSignal<any>): Promise<T> {
        // do we have to keep track of the promise an cancel it somehow?
        // do an active check here as well?
        return this.wrappedSignal().promisify(rejectSignal);
    }

    readOnly(): ReadableSignal<T> {
        return this;
    }

    reduce<U>(accumulator: Accumulator<T, U>, initialValue: U): ReadableSignal<U> {
        const reducedSignal = this.wrappedSignal().reduce(accumulator, initialValue);
        return trackListenersAddedTo(reducedSignal, this.trackingContext);
    }

    private wrappedSignal() {
        return this.wrapped;
    }
}
