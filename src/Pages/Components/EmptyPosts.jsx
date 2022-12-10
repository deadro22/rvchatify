import React, { Component } from "react";

class EmptyPosts extends Component {
  render() {
    return (
      <div className="inv_posts_empty">
        <div>
          <i className="fal fa-camera"></i>
          <h2>No posts</h2>
        </div>
      </div>
    );
  }
}

export default EmptyPosts;
