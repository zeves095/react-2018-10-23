import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import { filterArticlesActionCreator } from '../../ac'

class SelectFilter extends Component {
  render() {
    return (
      <Select
        options={this.optionsForSelect}
        onChange={this.handleSelectChange}
        value={this.selectedOption}
        isMulti={this.props.isMulti}
      />
    )
  }

  get optionsForSelect() {
    return this.props.articles.map((item) => ({
      value: item.id,
      label: item.title
    }))
  }

  get selectedOption() {
    if (!this.props.selectedOption) return null
    return this.props.articles
      .filter((a) => this.props.selectedOption.indexOf(a.id) >= 0)
      .map((v) => ({ value: v.id, label: v.title }))
  }

  handleSelectChange = (selectedOption) => {
    this.props.handleSelectChange(selectedOption) // map сделал в ac - но вероятно это надо было сделать здесь ?
  }
}

const mapStateToProps = (store) => ({
  selectedOption: store.filters.select.selectedOption, // null|<int>id[]
  isMulti: store.filters.select.config.isMulti,
  articles: store.articles
})

const mapDispatchToProps = {
  handleSelectChange: filterArticlesActionCreator
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectFilter)
