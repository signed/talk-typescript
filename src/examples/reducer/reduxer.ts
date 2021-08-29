// https://stackoverflow.com/questions/64527150/in-typescript-how-to-select-a-type-from-a-union-using-a-literal-type-property
// good explainations in the stackoverflow answer

type Add = {
  type: 'add'
  id: string
  value: string
}

type Remove = {
  type: 'remove'
  id: string
}

type Action = Add | Remove
type State = {}

type OfUnion<T extends { type: string }> = {
  [P in T['type']]: Extract<T, { type: P }>
}

type Handler<T> = {
  [P in keyof T]: (variant: T[P]) => any
}

// bunch of escape hatches in here
// as keyof H
// as any
function match<T extends { type: string }, H extends Handler<OfUnion<T>>>(obj: T, handler: H): ReturnType<H[keyof H]> {
  return handler[obj.type as keyof H]?.(obj as any)
}

const reducer = (state: State, action: Action) =>
  match(action, {
    add: (action) => state,
    remove: (action) => state,
  })
