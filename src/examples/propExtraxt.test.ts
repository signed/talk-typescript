import { OwnProps, pick, Props, splitProps } from './propExtract'

const withoutOptionalProp: Props = {
  cents: 'able',
  highly: 'boom',
  important: 4,
  my: 'bogus',
  two: 45,
}

test('explicitly split props', () => {
  const { own, passThrough } = splitProps(withoutOptionalProp)
  expect(own).toEqual({ my: 'bogus', two: 45, cents: 'able' })
  expect(passThrough).toEqual({ highly: 'boom', important: 4 })
})

test('explicitly split props', () => {
  const date = new Date()
  const props: Props = {
    cents: 'able',
    highly: 'boom',
    important: 4,
    my: 'bogus',
    two: 45,
    optional: 'value',
  }

  const { own, passThrough } = splitProps(props)
  expect(own).toEqual({ my: 'bogus', two: 45, cents: date, optional: 'value' })
  expect(passThrough).toEqual({ highly: 'boom', important: 4 })
})

test('pass keys in', () => {
  const own: OwnProps = pick(withoutOptionalProp, ['my', 'two', 'cents', 'optional'])
  expect(own).toEqual({ my: 'bogus', two: 45, cents: 'able' })
})
