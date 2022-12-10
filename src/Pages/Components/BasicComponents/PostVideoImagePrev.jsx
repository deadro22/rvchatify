import React, { Component } from "react";

class PostVideoImagePrev extends Component {
  render() {
    const { post } = this.props;
    return post.PreviewHolderType === "video/mp4" ? (
      <React.Fragment>
        <video id="bdr_blur" alt="" src={post.postPreviewHolder}>
          <source src={post.postPreviewHolder} />
        </video>
        <video controls autoPlay>
          <source src={post.postPreviewHolder} />
        </video>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <img id="bdr_blur" alt="" src={post.postPreviewHolder} />
        <img src={post.postPreviewHolder} alt={post.postPreviewHolder} />
      </React.Fragment>
    );
  }
}

export default PostVideoImagePrev;
