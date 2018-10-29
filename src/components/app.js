import React, { Component } from 'react'
import ArticleList from './article-list'
import articles from '../fixtures'
import UserForm from './user-form'
import Select from 'react-select'
import DayPicker, { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css'

export default class App extends Component {
  state = {
    selectedOption: null,
    selectedDay: undefined,
    days: {
      from: undefined,
      to: undefined
    }
  }

  render() {
    const { from, to } = this.state.days

    const style = {
      zoom: '0.2',
      width: '40%',
      height: '100%',
      flexGrow: 0,
      flexShrink: 0
    }

    const mstyle = {
      display: 'flex',
      flexDirection: 'row'
    }
    return (
      <div>
        <UserForm />
        <Select
          options={this.optionsForSelect}
          onChange={this.handleSelectChange}
          value={this.state.selectedOption}
          isMulti
        />
        {JSON.stringify(this.state)}
        <br />

        <div style={mstyle}>
          <div style={style}>
            <DayPicker
              onDayClick={this.onDayClickHandler}
              selectedDays={[{ from, to }]}
              month={new Date(2016, 0)}
              numberOfMonths={12}
              pagedNavigation
              fixedWeeks
            />
          </div>
          <ArticleList
            items={this.filteredArticles}
            selectedOption={this.state.selectedOption}
          />
        </div>
      </div>
    )
  }

  get filteredArticles() {
    let result = articles.filter((article) => this.filterDays(article.date))
    result = result.filter((article) => this.filterSelectedTitle(article.title))
    return result
  }
  onDayClickHandler = (day) => {
    const range = DateUtils.addDayToRange(day, this.state.days)
    this.setState({ days: range })
  }

  filterSelectedTitle = (title) => {
    if (
      !Array.isArray(this.state.selectedOption) ||
      this.state.selectedOption.length === 0
    )
      return true

    for (var selectedOption of this.state.selectedOption) {
      if (selectedOption.label === title) return true
    }
    return false
  }

  filterDays = (day) => {
    const { days: range = { from: undefined, to: undefined } } = this.state

    if (
      range.to === range.from &&
      (range.from === undefined || range.from === null)
    ) {
      return true
    }
    return DateUtils.isDayInRange(new Date(day), range)
  }

  get optionsForSelect() {
    return articles.map((item) => ({
      value: item.id,
      label: item.title
    }))
  }

  handleSelectChange = (selectedOption) => {
    this.setState({ selectedOption })
  }
}
