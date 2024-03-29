// inspired from
// https://github.com/immerjs/immer/blob/main/src/types/types-external.ts#L102
// https://github.com/reduxjs/reselect/blob/master/src/types.ts#L97C13-L97C35
type ActionCreatorParameter<TState> = (current: TState, ...args: any[]) => Partial<TState>

type Action<TState, TActionCreatorParameter> = TActionCreatorParameter extends (
  current: TState,
  ...argws: infer ActionArguments
) => Partial<TState>
  ? (...args: ActionArguments) => void
  : never

export class Store<State extends object> {
  _state: State

  constructor(initial: State) {
    this._state = initial
  }

  get state(): State {
    return this._state
  }

  action<T extends ActionCreatorParameter<State>>(callback: T): Action<State, T> {
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
