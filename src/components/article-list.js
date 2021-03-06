import React, { Component } from 'react'
import Article from './article'
import accordion from '../decorators/accordion'
import commented from '../decorators/commented'

class ArticleList extends Component {
  render() {
    return <ul>{this.items}</ul>
  }

  get items() {
    return this.props.items.map((item) => (
      <li key={item.id}>
        <Article
          article={item}
          isOpen={this.props.openItemId === item.id}
          toggleOpen={this.props.toggleOpenItem}
          isOpenComments={this.props.openCommentsItemId === item.id}
          toggleCommentsOpen={this.props.toggleCommentsOpenItem}
        />
      </li>
    ))
  }
}

export default commented(accordion(ArticleList))
