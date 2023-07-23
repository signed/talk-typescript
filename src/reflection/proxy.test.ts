import { Banana, ripeBanana } from './proxy'

test('forward not trapped properties to the original object', () => {
  expect(ripeBanana.brand).toBe('blue banana')
})

test('return proxy override for trapped properties ', () => {
  expect(ripeBanana.color).toBe('spotty yellow')
})

test('proxy fills in slow in case no argument is provided ', () => {
  expect(new Banana().peel()).toBe('just yummy')
  expect(ripeBanana.peel()).toBe('slow yummy')
  expect(ripeBanana.peel('fast')).toBe('fast yummy')
})
