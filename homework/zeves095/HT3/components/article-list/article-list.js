import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Article from '../article'
import accordion from '../../decorators/accordion'

export class ArticleList extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired,
    fetchData: PropTypes.func,

    //from accordion decorator
    openItemId: PropTypes.string,
    toggleOpenItem: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.fetchData && this.props.fetchData()
  }
  render() {
    return <ul>{this.items}</ul>
  }

  get items() {
    let startDate = new Date(this.props.filters.calendar.from)
    let endDate = new Date(this.props.filters.calendar.to)

    return this.props.articles
      .filter((item) => {
        let itemDate = new Date(item.date)

        return (
          itemDate.getTime() >= startDate.getTime() &&
          itemDate.getTime() <= endDate.getTime()
        )
      })
      .filter((item) => {
        console.log(this.props.filters.select.selectedOption)
        if (!this.props.filters.select) return true
        if (!this.props.filters.select.selectedOption) return true
        if (!Array.isArray(this.props.filters.select.selectedOption))
          return item.id === this.props.filters.select.selectedOption
        return this.props.filters.select.selectedOption.length
          ? this.props.filters.select.selectedOption.includes(item.id)
          : true
      })
      .map((item) => (
        <li key={item.id} className={'test--article-list_item'}>
          <Article
            article={item}
            isOpen={this.props.openItemId === item.id}
            toggleOpen={this.props.toggleOpenItem}
          />
        </li>
      ))
  }
}

const mapStateToProps = (store) => ({
  articles: store.articles,
  filters: store.filters
})

export default connect(mapStateToProps)(accordion(ArticleList))
