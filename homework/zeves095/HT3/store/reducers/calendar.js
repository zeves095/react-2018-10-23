import {
  CHANGE_CALENDAR_RANGE,
  RESET_CALENDAR_RANGE,
  CHANGE_CALENDAR_MONTHS
} from '../../constants'

import { DateUtils } from 'react-day-picker'

const calendarInitial = {
  config: {
    numberOfMonths: 2
  },
  from: new Date('2010.01.01'),
  to: undefined
}

export default (state = calendarInitial, action) => {
  switch (action.type) {
    case RESET_CALENDAR_RANGE:
    case CHANGE_CALENDAR_RANGE:
      const day = action.payload
      let range = { from: calendarInitial.from, to: calendarInitial.to }
      if (day) {
        range = DateUtils.addDayToRange(day, state)
      }
      if (range.from === state.from && range.to === state.to) return state
      state = Object.assign({}, state, range)
      break

    case CHANGE_CALENDAR_MONTHS:
      if (action.payload === state.config.numberOfMonths) return state
      state = Object.assign({}, state, {
        config: { numberOfMonths: action.payload }
      })
      break

    default:
      break
  }

  return state
}
