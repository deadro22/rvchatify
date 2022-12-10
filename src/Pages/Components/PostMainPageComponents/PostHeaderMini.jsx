import React, { Component } from "react";
import UnvProfileImage from "../UnvProfileImage";
import Helpers from "../../../Helpers";
import DynamicText from "./../BasicComponents/DynamicText";

class PostHeaderMini extends Component {
  render() {
    const { post } = this.props;
    return (
      <div>
        <div className="pst_header">
          <UnvProfileImage
            username={post.postOwner.username}
            size={"45px"}
            f_size={"13px"}
            prf_image={post.postOwner.profileImage}
          />
          <h3>{post.postOwner.username}</h3>
          <p>{Helpers.setPostTimeDate(post.postDate)}</p>
          {this.props.closable && (
            <button
              className="bt_default_rm"
              onClick={() => Helpers.returnBack(this.props.history)}
            >
              <i className="fal fa-times"></i>
            </button>
          )}
        </div>
        <DynamicText history={this.props.history} content={post.postHeader} />
      </div>
    );
  }
}

export default PostHeaderMini;
