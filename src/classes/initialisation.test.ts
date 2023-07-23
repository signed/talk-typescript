export class AssignedInParameter {
  // derived will be undefined, is this a bug in typescript?
  readonly derived: string = this.parameter

  constructor(public readonly parameter: string) {}
}

test('assignment in parameter is not available when initializing other fields   ', () => {
  expect(new AssignedInParameter('value').derived).toEqual(undefined)
})

export class AssignedInConstructorBody {
  readonly derived: string

  constructor(public readonly parameter: string) {
    this.derived = this.parameter
  }
}

test('assignment in parameter is not available when initializing other fields   ', () => {
  expect(new AssignedInConstructorBody('value').derived).toEqual('value')
})
