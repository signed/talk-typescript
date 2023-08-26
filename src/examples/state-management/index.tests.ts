import { test, expect } from 'vitest'
import { Store } from './index'

test('basic action', () => {
  const store = new Store({ value: 'initial' })
  const action = store.action((_state: State, n: number, _k: string, _d: Date) => {
    return { value: `updated ${n}` }
  })
  action(45, '45', new Date())

  expect(store.state.value).toEqual('updated 45')
})
