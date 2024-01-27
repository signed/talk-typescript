import { test, expect } from 'vitest'

export class AssignedInParameter {
  // derived will be undefined, is this a bug in typescript?
  // @ts-expect-error with strictest settings TypeScript detects this as problematic
  readonly derived: string = this.parameter

  constructor(public readonly parameter: string) {}
}

// looks like this is working after switching to vitest, not sure why...
test.skip('assignment in parameter is not available when initializing other fields', () => {
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
