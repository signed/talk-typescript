type ActionCreator<TState> = (current: TState, ...args: any[]) => Partial<TState>
type Action<T, U extends ActionCreator<T>> = U extends (current: T, ...args: infer Args) => Partial<T>
  ? (...args: Args) => void
  : never

export class Store<State extends object> {
  _state: State

  constructor(initial: State) {
    this._state = initial
  }

  get state(): State {
    return this._state
  }

  action<T extends ActionCreator<State>>(callback: T): Action<State, T> {
    const that = this._state

    return (number: number) => {
      const patch = callback(that, number)

      Object.entries(patch).forEach(([k, value]) => {
        // @ts-ignore
        this._state[k] = value
      })
    }
  }
}
