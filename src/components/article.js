import React, { PureComponent } from 'react'

export default class Article extends PureComponent {
  render() {
    const { article, isOpen, isOpenComments } = this.props
    const buttonTitle = isOpen ? 'close' : 'open'
    const buttonCommentTitle = isOpenComments
      ? 'закрыть коментарии'
      : 'открыть комментарии'

    return (
      <div>
        <h3>{article.title}</h3>
        <button onClick={this.handleClick}>{buttonTitle}</button>
        <button disabled={!isOpen} onClick={this.toggleCommentsHandleClick}>
          {buttonCommentTitle}
        </button>
        {this.body}
        {this.comments}
      </div>
    )
  }

  handleClick = () => {
    this.props.toggleOpen(this.props.article.id)
  }

  toggleCommentsHandleClick = () => {
    this.props.toggleCommentsOpen(this.props.article.id)
  }

  get body() {
    const { isOpen, article } = this.props

    if (!isOpen) return null

    return <section>{article.text}</section>
  }

  get comments() {
    const { isOpen, isOpenComments, article } = this.props

    if (!isOpen || !isOpenComments) return null

    const style = {
      borderBottom: '2px solid blue',
      marginLeft: '50px',
      marginBottom: '10px'
    }
    return article.comments.map((comment) => (
      <div key={comment.id} style={style}>
        {comment.text}
      </div>
    ))
  }
}
