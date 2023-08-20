import { Store } from './index'

test('basic action', () => {
  const store = new Store('initial')
  const action = store.action((state: State, n: number) => {
    return `updated ${n}`
  })
  action(45)

  expect(store.state).toEqual('updated 45')
})
