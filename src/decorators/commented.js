// HOC === Higher Order Component

import React, { Component } from 'react'

export default (OriginalComponent) =>
  class DecoratedComponent extends Component {
    state = {
      openCommentsItemId: null
    }
    toggleCommentsOpenItem = (openCommentsItemId) => {
      const newId =
        this.state.openCommentsItemId == openCommentsItemId
          ? null
          : openCommentsItemId
      this.setState({ openCommentsItemId: newId })
    }

    render() {
      return (
        <OriginalComponent
          {...this.props}
          toggleCommentsOpenItem={this.toggleCommentsOpenItem}
          openCommentsItemId={this.state.openCommentsItemId}
        />
      )
    }
  }
