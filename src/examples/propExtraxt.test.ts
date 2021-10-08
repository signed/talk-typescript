import { Props, splitProps } from './propExtract'

test('explicitly split props', () => {
  const date = new Date()
  const props: Props = {
    cents: date,
    highly: 'boom',
    important: 4,
    my: 'bogus',
    two: 45,
  }

  const { own, passThrough } = splitProps(props)
  expect(own).toEqual({ my: 'bogus', two: 45, cents: date })
  expect(passThrough).toEqual({ highly: 'boom', important: 4 })
})

test('explicitly split props', () => {
  const date = new Date()
  const props: Props = {
    cents: date,
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
