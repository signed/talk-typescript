export interface OwnProps {
  my: string
  two: number
  cents: string
  optional?: string
}

export interface PassThroughProps {
  highly: string
  important: number
}

export interface Props extends OwnProps, PassThroughProps {}

// https://rossbulat.medium.com/typescript-react-manipulating-prop-types-ec13f841a550
export const splitProps = (props: Props) => {
  const { cents, my, two, optional, ...rest } = props
  const own: OwnProps = {
    my,
    two,
    cents,
    optional,
  }
  const passThrough: PassThroughProps = rest

  return {
    own,
    passThrough,
  }
}

//chakra-ui
export function pick<T extends object, K extends keyof T>(object: T, keys: K[]) {
  const result = {} as { [P in K]: T[P] }
  keys.forEach((key) => {
    if (key in object) {
      result[key] = object[key]
    }
  })
  return result
}

//https://stackoverflow.com/a/50895613
export function extract<T>(properties: Record<keyof T, true>) {
  return function <TActual extends T>(value: TActual) {
    const result = {} as T
    for (const property of Object.keys(properties) as Array<keyof T>) {
      result[property] = value[property]
    }
    return result
  }
}
