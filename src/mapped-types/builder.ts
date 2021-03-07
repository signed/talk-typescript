type Builder<T> = {
    [Property in keyof T as `with${Capitalize<string & Property>}`]: (value: T[Property]) => Builder<T>
} & { build(): T }

interface Data {
    one: string;
    two: number;
}
type DataBuilder = Builder<Data>

const ensure = <T>(value: T | undefined): T => {
    if (value === undefined) {
        throw new Error('mandatory')
    }
    return value
};

class Hmm implements DataBuilder {
    private one: string | undefined;
    private two: number | undefined;

    withOne(value: Data['one']): this {
        return this;
    }

    withTwo(value: Data['two']): this {
        return this;
    }

    build(): Data {
        const one = ensure(this.one)
        const two = ensure(this.two);
        return {
            one: one,
            two: two
        };
    }
}



