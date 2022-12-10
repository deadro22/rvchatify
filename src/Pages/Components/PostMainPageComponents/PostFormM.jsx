import React, { Component } from "react";
import Helpers from "../../../Helpers";
import Like from "./Like";
import Comment from "./Comment";
import UnvProfileImage from "./../UnvProfileImage";

class PostFormMain extends Component {
  state = {
    commentBody: "",
  };
  componentDidMount() {
    this.props.socket.on("commentPostRes", (data) => {
      const nComment = {
        commentOwner: {
          username: data.cm_res.user.username,
          profileImage: data.cm_res.user.profileImage,
        },
        commentInner: data.cm_res.newComment.commentInner,
        commentDate: data.cm_res.newComment.commentDate,
      };
      this.props.addCommentOnPost(nComment);
      this.setState({ commentBody: "" });
    });
  }

  render() {
    const { socket, user, post } = this.props;
    return (
      <div className="pst_inter_main_h">
        <div className="pst_inter_ic">
          <Like
            likes={post.likes}
            postId={post.postId}
            user={user}
            socket={socket}
          />
          <Comment
            toggleComments={this.props.toggleComments}
            commentsCount={this.props.commentsCount.length}
          />
        </div>
        <form
          className="comment_fr_pst"
          method="POST"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <UnvProfileImage
              username={this.props.user.username}
              size={"40px"}
              f_size={"10px"}
              prf_image={this.props.user.profileImage}
            />
            <input
              type="text"
              placeholder="Add a comment..."
              value={this.state.commentBody}
              onChange={(e) => this.setState({ commentBody: e.target.value })}
              onKeyDown={(e) =>
                Helpers.commentPost(e, socket, post, user, e.target.value)
              }
            ></input>
            <i className="fa fal-paper-plane"></i>
          </div>
        </form>
      </div>
    );
  }
}

export default PostFormMain;
