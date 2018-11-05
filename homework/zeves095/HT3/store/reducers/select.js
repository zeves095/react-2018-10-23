import { SELECT_ARTICLE } from '../../constants'

const selectInitial = {
  config: {
    isMulti: true
  },
  selectedOption: null
}

export default (state = selectInitial, action) => {
  switch (action.type) {
    case SELECT_ARTICLE:
      if (
        state.selectedOption === action.payload ||
        (Array.isArray(state.selectedOption) &&
          Array.isArray(action.payload) &&
          state.selectedOption.length === action.payload.length &&
          state.selectedOption.every((v, i) => v === action.payload[i]))
      )
        return state

      state = Object.assign({}, state)
      state.selectedOption = action.payload // мутация - из-за assign state выше.  Фактически же - это даже не мутация в итоге.
      break
    default:
      break
  }

  return state
}
