import React, { Component } from "react";
import UnvProfileImage from "./UnvProfileImage";
import { Link } from "react-router-dom";
import helpers from "../../Helpers";
import Like from "./PostMainPageComponents/Like";
import Comment from "./PostMainPageComponents/Comment";
import io from "socket.io-client";
import HomePostComments from "./HomeComponents/HomePostComments";
import axios from "axios";
import Loader from "./BasicComponents/Loader";
import lodash from "lodash";
import DynamicText from "./BasicComponents/DynamicText";

class Post extends Component {
  state = {
    showComments: false,
    loadingComments: false,
  };
  componentDidMount() {
    const socket = io.connect(helpers.getBackendLink() + "/post");
    this.setState({ socket });
    socket.emit("joinPost", this.props.post.postId);
  }
  toggleComments = async () => {
    if (lodash.isEmpty(this.state.comments)) {
      this.setState({ loadingComments: true });
      try {
        const comments = await axios.get(
          "/api/posts/rev/" +
            this.props.post._id +
            "/" +
            this.props.post.postId +
            "/comments",
          { withCredentials: true }
        );
        this.setState({
          showComments: !this.state.showComments,
          comments: comments.data,
          loadingComments: false,
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      this.setState({ showComments: !this.state.showComments });
    }
  };
  render() {
    const { socket } = this.state;
    const { post, user } = this.props;
    return (
      <div className="prf_post_mn">
        <div className="post_header_m pd-1">
          <div className="post_sub_hd">
            <div className="mr-r-1">
              <UnvProfileImage
                username={post.postOwner.username}
                size={"50px"}
                f_size={"15px"}
                prf_image={post.postOwner.profileImage}
              />
            </div>
            <div id="post_hli">
              <Link
                className="default_lnk_rm"
                to={"/profile/" + post.postOwner.username}
              >
                <p className="t-dark-sld">{post.postOwner.username}</p>
              </Link>
              <p className="t-muted-sm" style={{ fontSize: "14px" }}>
                {helpers.setPostTimeDate(post.postDate)}
              </p>
            </div>
          </div>
          <div>
            <button className="bt_default_rm drp_post">
              <i className="fa fa-ellipsis-h"></i>
            </button>
          </div>
        </div>
        <div className="post-header-inf">
          <DynamicText history={this.props.history} content={post.postHeader} />
        </div>
        <div className="post-prev-info">
          {post.PreviewHolderType === "video/mp4" ? (
            <div
              className="h_vd_pst"
              onClick={() => this.props.history.push("/post/" + post.postId)}
            >
              <video>
                <source src={post.postPreviewHolder} />
              </video>
              <i className="fa fa-play"></i>
            </div>
          ) : (
            <img
              onClick={() => this.props.history.push("/post/" + post.postId)}
              src={post.postPreviewHolder}
              alt=""
            />
          )}

          {socket && (
            <div>
              <div className="post_inter_hld">
                <Like
                  likes={post.likes}
                  postId={post.postId}
                  user={user}
                  socket={socket}
                />
                <Comment
                  toggleComments={this.toggleComments}
                  commentsCount={this.props.commentsCount.length}
                />
              </div>
              {this.props.custom &&
                (this.state.loadingComments ? (
                  <Loader />
                ) : (
                  this.state.showComments &&
                  this.state.comments.comments.length > 0 && (
                    <React.Fragment>
                      <hr />
                      <HomePostComments
                        postComment={post}
                        comments={this.state.comments.comments}
                      />
                    </React.Fragment>
                  )
                ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Post;
