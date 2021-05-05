import { Maybe } from './maybe';

interface ValueCache {
    value(): Maybe<string>
}

type Cached<T extends Cacheable<T>> = ValueCache & Omit<T, 'cache'>

interface Cacheable<T extends Cacheable<T>> {
    cache(): Cached<T>
}

interface Readable<T> {
    filter(): this
}

interface Writable<T> {
    dispatch(value: T): void
}

class DefaultSignal<T> implements Writable<T>, Readable<T>, Cacheable<DefaultSignal<T>> {
    dispatch(value: T): void {
        throw new Error('Method not implemented.');
    }

    filter(): this {
        return this;
    }

    cache(): Cached<this> {
        throw new Error('implement me');
    }
}

const readable = new DefaultSignal<string>();
const cached = readable.cache();

// @ts-expect-error
cached.cache();

cached.dispatch('one');

