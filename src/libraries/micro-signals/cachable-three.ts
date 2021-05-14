import { Accumulator, Cache, Listener, ReadableSignal, Signal, ValueCache } from 'micro-signals';
import { Maybe } from './maybe';

interface ReadableSignalWithCache<T> extends ReadableSignal<T> {
    latestValue(): Maybe<T>
}

class CachedSignal<T> implements Omit<ReadableSignalWithCache<T>, 'cache'> {

    constructor(private readonly wrapped: ReadableSignal<T>, private readonly cache: Cache<T>) {
    }

    filter<U extends T>(filter: (payload: T) => payload is U): ReadableSignal<U>;
    filter(filter: (payload: T) => boolean): ReadableSignal<T>;
    filter(filter: (payload: T) => boolean): ReadableSignal<T> {
        return this.wrapped.filter(filter);
    }

    add(listener: Listener<T>, ...tags: any[]): void {
        this.wrapped.add(listener, ...tags);
    }

    addOnce(listener: Listener<T>, ...tags: any[]): void {
        this.wrapped.addOnce(listener, ...tags);
    }

    map<U>(transform: (payload: T) => U): ReadableSignal<U> {
        return this.wrapped.map(transform);
    }

    merge<U>(...signals: ReadableSignal<U>[]): ReadableSignal<T | U> {
        return this.wrapped.merge(...signals);
    }

    peek(peekaboo: (payload: T) => void): ReadableSignal<T> {
        return this.wrapped.peek(peekaboo);
    }

    promisify(rejectSignal?: ReadableSignal<any>): Promise<T> {
        return this.wrapped.promisify(rejectSignal);
    }

    readOnly(): ReadableSignal<T> {
        return this.wrapped.readOnly();
    }

    reduce<U>(accumulator: Accumulator<T, U>, initialValue: U): ReadableSignal<U> {
        return this.wrapped.reduce(accumulator, initialValue);
    }

    remove(listenerOrTag: any): void {
        this.wrapped.remove(listenerOrTag);
    }

    latestValue(): Maybe<T> {
        let value: Maybe<T> = undefined;
        this.cache.forEach((v) => value = v);
        return value;
    }
}

const cachedSignal = new CachedSignal<string>(new Signal(), new ValueCache());
console.log(cachedSignal.latestValue())
