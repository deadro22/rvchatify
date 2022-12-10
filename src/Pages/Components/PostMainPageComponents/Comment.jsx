import React, { Component } from "react";

class Comment extends Component {
  render() {
    return (
      <p>
        <i className="fal fa-comment" onClick={this.props.toggleComments}></i>{" "}
        {this.props.commentsCount}
      </p>
    );
  }
}

export default Comment;
