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
  one: string
  two: number
}
type DataBuilder = Builder<Data>

const ensure = <T>(value: T | undefined): T => {
  if (value === undefined) {
    throw new Error('mandatory')
  }
  return value
}

class Hmm implements DataBuilder {
  one: Data['one'] | undefined
  two: Data['two'] | undefined
  withOne<Property>(value: Data['one']): Builder<Data> {
    this.one = value
    return this
  }

  withTwo<Property>(value: Data['two']): Builder<Data> {
    this.two = value
    return this
  }

  build(): Data {
    if (this.one === undefined || this.two === undefined) {
      throw new Error()
    }
    return { one: this.one, two: this.two }
  }
}
