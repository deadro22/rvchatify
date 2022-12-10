import React, { Component } from "react";
import UnvProfileImage from "./UnvProfileImage";
import ProfilePostForm from "./ProfilePostForm";
import axios from "axios";
import DynamicText from "./BasicComponents/DynamicText";

class ProfileHeader extends Component {
  state = {
    addingPost: false,
    isFollower: false,
    followInviteSent: false,
  };
  componentDidMount() {
    if (this.props.user.followers.includes(this.props.authUser.data._id)) {
      this.setState({ isFollower: true });
    } else if (
      this.props.user.followRequests.includes(this.props.authUser.data._id)
    ) {
      this.setState({ followInviteSent: true });
    }
  }
  addPostForm = () => {
    this.setState({ addingPost: !this.state.addingPost });
  };
  followUser = async () => {
    try {
      const res = await axios.post(
        "/api/users/profile/" + this.props.user.username + "/follow",
        null,
        { withCredentials: true }
      );
      this.followBtnVal.value = "Following";
      console.log(res);
    } catch (e) {
      console.warn(e.response);
    }
  };
  render() {
    const { user, postsCount } = this.props;
    const { data: authUser } = this.props.authUser;
    return (
      <div className="prf_mn_header">
        <div className="prf_header_inp">
          <div className="prf_header_ibt">
            <div className="prf_header_img">
              <UnvProfileImage
                username={user.username}
                size={"140px"}
                f_size={"25px"}
                prf_image={user.profileImage}
                uncc
              />
            </div>
          </div>
          <div className="prf_info_des">
            <div id="prf_header_ur">
              <h2>{user.username}</h2>
              {user._id === authUser._id && (
                <React.Fragment>
                  <button
                    className="prf_bt t-dark-sld"
                    onClick={this.props.toggleModify}
                  >
                    Modify Profile
                  </button>
                  <button className="prf_bt" onClick={this.addPostForm}>
                    <i
                      className={
                        this.state.addingPost
                          ? "fal fa-times t-dark-sld"
                          : "fal fa-plus t-dark-sld"
                      }
                    ></i>
                  </button>
                </React.Fragment>
              )}
            </div>
            <DynamicText
              history={this.props.history}
              content={
                user.profileDescription
                  ? user.profileDescription
                  : "No description"
              }
            />
            {!(user._id === authUser._id) && (
              <button
                className="prf_bt"
                onClick={this.followUser}
                style={{ backgroundColor: this.state.isFollower && "#858585" }}
              >
                <p ref={(ref) => (this.followBtnVal = ref)}>
                  {!this.state.followInviteSent && (
                    <i
                      className={
                        this.state.isFollower ? "fa fa-check" : "fa fa-plus"
                      }
                    ></i>
                  )}{" "}
                  {this.state.followInviteSent
                    ? "Follow Request Sent"
                    : this.state.isFollower
                    ? "Following"
                    : "Follow"}
                </p>
              </button>
            )}
          </div>
        </div>
        {this.state.addingPost && user._id === authUser._id && (
          <ProfilePostForm
            addingPost={this.state.addingPost}
            authUser={authUser}
            history={this.props.history}
          />
        )}
        <div className="prf_header_st_inf">
          <div>
            <p>Posts</p>
            <p className="t-dark-sld">{postsCount}</p>
          </div>
          <div>
            <p>Followers</p>
            <p className="t-dark-sld">{user.followers.length}</p>
          </div>
          <div>
            <p>Following</p>
            <p className="t-dark-sld">{user.following.length}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
