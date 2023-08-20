export type State = { value: string }

export class Store {
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

      if ('value' in patch) {
        if (patch.value) {
          this._state.value = patch.value
        }
      }
    }
  }
}
