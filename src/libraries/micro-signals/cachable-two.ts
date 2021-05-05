import { Maybe } from './maybe';

interface ValueCache {
    value(): Maybe<string>
}

type Cached<T> = T & ValueCache

interface Cacheable<T> {
    cache(): Cached<T>
}

interface Readable<T> {
    filter(): this
}

interface Writable<T> {
    dispatch(value: T): void
}

class DefaultSignal<T> implements Writable<T>, Readable<T>, Cacheable<Omit<DefaultSignal<T>, 'cache' >> {
    dispatch(value: T): void {
        throw new Error('Method not implemented.');
    }

    filter(): this {
        return this;
    }

    cache(): Cached<Omit<this, 'cache'>> {
        throw new Error();
    }
}

const signal = new DefaultSignal<string>();
const cached = signal.cache();

// @ts-expect-error
cached.cache();
cached.dispatch('one');

