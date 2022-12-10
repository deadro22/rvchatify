import React, { Component } from "react";
import UnvProfileImage from "./UnvProfileImage";
import { Link } from "react-router-dom";
import helpers from "../../Helpers";

class CommentPostMain extends Component {
  render() {
    return (
      <div className="pst_c_lst">
        <div className="pst_c_owner">
          <UnvProfileImage
            username={this.props.comment.commentOwner.username}
            size={"35px"}
            f_size={"10px"}
            prf_image={this.props.comment.commentOwner.profileImage}
          />
          <Link
            className="default_lnk_rm"
            to={"/profile/" + this.props.comment.commentOwner.username}
          >
            <p>{this.props.comment.commentOwner.username}</p>
          </Link>
        </div>
        <div className="pst_comment">{this.props.comment.commentInner}</div>
        <div className="pst_comment_date">
          <p>{helpers.setPostTimeDate(this.props.comment.commentDate)}</p>
        </div>
      </div>
    );
  }
}

export default CommentPostMain;
