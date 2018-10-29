import React, { Component } from 'react'
import ArticleList from './article-list'
import articles from '../fixtures'
import UserForm from './user-form'
import Select from 'react-select'
import DayPicker, { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css'

const birthdayStyle = `.DayPicker-Day--highlighted {
  background-color: orange;
  color: white;
}`

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
    return (
      <div>
        <UserForm />
        <Select
          options={this.optionsForSelect}
          onChange={this.handleSelectChange}
          value={this.state.selectedOption}
        />
        {JSON.stringify(this.state)}
        <br />
        <DayPicker
          onDayClick={this.onDayClickHandler}
          selectedDays={[{ from, to }]}
        />
        <ArticleList items={this.filteredArticles} />
      </div>
    )
  }

  get filteredArticles() {
    const result = articles.filter((article) => this.filterDays(article.date))
    console.log(result)
    return result
  }
  onDayClickHandler = (day) => {
    const range = DateUtils.addDayToRange(day, this.state.days)
    this.setState({ days: range })
  }

  filterDays = (day) => {
    console.log(day)
    const { days: range = { from: undefined, to: undefined } } = this.state
    console.log(range)
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
