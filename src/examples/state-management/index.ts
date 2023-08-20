export class Store<State extends object> {
  _state: State

  constructor(initial: State) {
    this._state = initial
  }

  get state(): State {
    return this._state
  }

  action(callback: (state: State, number: number) => Partial<State>): (number: number) => void {
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
