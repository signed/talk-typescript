import { test, expect, assertType, expectTypeOf } from 'vitest'
import { Store } from './index'

test('basic action', () => {
  const store = new Store({ value: 'initial' })

  const action = store.action((_state: State, n: number, _k: string, _d: Date) => {
    return { value: `updated ${n}` }
  })

  expectTypeOf(action).parameter(0).toMatchTypeOf<number>()
  expectTypeOf(action).parameter(1).toMatchTypeOf<string>()
  expectTypeOf(action).parameter(2).toMatchTypeOf<Date>()
  expectTypeOf(action).parameter(3).toMatchTypeOf<unknown>()
  assertType<(n: number, k: string, d: Date) => void>(action)
  action(45, 'blub', new Date())

  expect(store.state.value).toEqual('updated 45')
})
