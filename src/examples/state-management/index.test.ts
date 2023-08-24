import { Store } from './index'

test('basic action', () => {
  const store = new Store({ value: 'initial' })
  const action = store.action((state: State, n: number, k: string, d: Date) => {
    return { value: `updated ${n}` }
  })
  action(45, '45', new Date())

  expect(store.state.value).toEqual('updated 45')
})
