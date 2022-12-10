import React, { Component } from "react";
import EmptyPosts from "./EmptyPosts";
import PrivateProfile from "./PrivateProfile";

class ProfilePost extends Component {
  render() {
    const { user } = this.props;
    const { data: authUser } = this.props.authUser;
    if (
      user._id === authUser._id ||
      !user.private ||
      user.followers.includes(authUser._id)
    ) {
      return (
        <div className="prf_post_grd">
          <React.Fragment>
            {user.posts.length > 0 ? (
              <div className="prf_post_mn_hld">
                {user.posts.map((post) => (
                  <div
                    key={post._id}
                    className="post_img_h"
                    style={{
                      backgroundImage: `url(
                        ${post.postPreviewHolder})`,
                    }}
                    onClick={() =>
                      this.props.history.push("/post/" + post.postId)
                    }
                  >
                    {post.PreviewHolderType === "video/mp4" && (
                      <div className="prv_vd_hld">
                        <video className="prv_cvid">
                          <source src={post.postPreviewHolder} />
                        </video>
                        <i className="fa fa-play"></i>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <EmptyPosts />
            )}
          </React.Fragment>
        </div>
      );
    } else {
      return (
        <div className="prf_post_grd">
          <PrivateProfile />
        </div>
      );
    }
  }
}

export default ProfilePost;
