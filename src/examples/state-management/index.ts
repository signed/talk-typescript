type ActionCreator<TState> = (current: TState, ...args: any[]) => Partial<TState>

type Action<TState, U extends ActionCreator<TState>> = U extends (
  current: TState,
  ...args: infer IArgs
) => Partial<TState>
  ? (...args: IArgs) => void
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
    const action = (...args: any[]) => {
      const patch = callback(that, ...args)

      Object.entries(patch).forEach(([k, value]) => {
        // @ts-ignore
        this._state[k] = value
      })
    }
    return action as Action<State, T>
  }
}
