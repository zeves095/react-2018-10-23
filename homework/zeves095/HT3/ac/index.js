import {
  INCREMENT,
  DELETE_ARTICLE,
  CHANGE_CALENDAR_RANGE,
  RESET_CALENDAR_RANGE,
  SELECT_ARTICLE
} from '../constants'

export function incrementActionCreator() {
  return { type: INCREMENT }
}

export function deleteArticle(articleId) {
  return {
    type: DELETE_ARTICLE,
    payload: articleId
  }
}

export function filterArticlesActionCreator(articleOption) {
  return {
    type: SELECT_ARTICLE,
    payload: Array.isArray(articleOption)
      ? articleOption.map((option) => option.value)
      : articleOption.value
  }
}

export function changeCalendarRangeActionCreator(day = undefined) {
  return {
    type: day ? CHANGE_CALENDAR_RANGE : RESET_CALENDAR_RANGE,
    payload: day
  }
}
