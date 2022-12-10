import React, { Component } from "react";
import CommentPostMain from "./../CommentMainPost";

class HomePostComments extends Component {
  render() {
    const { postComment, comments } = this.props;
    return (
      <div className="hm_comments_main_hl">
        {comments.map((comment) => (
          <React.Fragment>
            <CommentPostMain
              postComment={postComment}
              comment={comment}
              key={comment._id}
            />
            <hr />
          </React.Fragment>
        ))}
      </div>
    );
  }
}

export default HomePostComments;
