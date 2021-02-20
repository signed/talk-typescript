

interface WithReadWriteProperty {
    property: string
}

// https://github.com/microsoft/TypeScript/issues/11596#issuecomment-256658202
// IMO this should be a type error
class ReadOnlyImplementation implements WithReadWriteProperty {
    get property() {
        return 'one'
    }
}

// https://github.com/microsoft/TypeScript/issues/33621
class WriteOnlyImplementation implements WithReadWriteProperty {
    set property(value:string) {
        console.log(value)
    }
}

test('this came as a surprise to me ', () => {
    const writeOnlyInstance: WithReadWriteProperty = new WriteOnlyImplementation()
    expect(writeOnlyInstance.property).toBe(undefined)

    const readOnlyInstance: WithReadWriteProperty = new ReadOnlyImplementation()
    expect(()=> readOnlyInstance.property = 'wohoh').toThrow(TypeError)
});
