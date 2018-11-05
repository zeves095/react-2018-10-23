import { combineReducers } from 'redux'
import counterReducer from './counter'
import articlesReducer from './articles'
import calendarReducer from './calendar'
import selectReducer from './select'

export default combineReducers({
  count: counterReducer,
  articles: articlesReducer,
  filters: combineReducers({
    calendar: calendarReducer,
    select: selectReducer
  })
})
