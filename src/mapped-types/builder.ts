type FluentBuilder<T> = {
    [Property in keyof T as `with${Capitalize<string & Property>}`]: (value: T[Property]) => Builder<T>
}

// mainly exist to ease code generation in the IDE
// did not find a way yet to make the properties private
type Properties<T> = {
    [Property in keyof T]: T[Property] | undefined
}

type Builder<T> = FluentBuilder<T> & Properties<T> & { build(): T }

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
    one: string | undefined;
    two: number | undefined;

    withOne(value: Data['one']): this {
        this.one = value
        return this;
    }

    withTwo(value: Data['two']): this {
        this.two = value
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



