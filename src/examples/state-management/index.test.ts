import { Store } from './index'

test('basic action', () => {
  const store = new Store({ value: 'initial' })
  const action = store.action((state: State, n: number) => {
    return { value: `updated ${n}` }
  })
  action(45)

  expect(store.state.value).toEqual('updated 45')
})
