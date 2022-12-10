import React, { Component } from "react";
import Popup from "./../BasicComponents/Popup";
import UnvProfileImage from "./../UnvProfileImage";
import "./profileExtras.css";
import axios from "axios";
import Loader from "./../BasicComponents/Loader";

class ProfileModify extends Component {
  state = {
    loadingModify: false,
  };
  updateProfile = async (e) => {
    e.preventDefault();
    try {
      if (
        this.state.profileDescription ||
        this.state.username ||
        this.state.profileImage
      ) {
        const postData = {
          username: this.state.username,
          profileDescription: this.state.profileDescription,
          profile_image: this.state.PreviewImgsrc,
        };
        const data = new FormData(e.target);
        if (postData.username || postData.username !== undefined) {
          data.set("username", postData.username);
        }
        if (
          postData.profileDescription ||
          postData.profileDescription !== undefined
        ) {
          data.set("profileDescription", postData.profileDescription);
        }
        if (
          postData.profile_image ||
          postData.profileDescription !== undefined
        ) {
          data.append("profile_image", postData.profile_image);
        }
        this.setState({ loadingModify: true });
        const newUser = await axios.post(
          "/api/users/profile/" + this.props.user.username + "/update",
          data,
          {
            withCredentials: true,
          }
        );
        this.props.togglePopup();
        this.props.history.replace("/profile/" + newUser.data.username);
      }
    } catch (e) {
      this.setState({ loadingModify: false });
      console.log(e);
    }
  };
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  imgUploadHandle = (e) => {
    this.setState({ profileImage: e.target.value });
    if (e.target.files[0]) {
      let nfile = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(nfile);
      reader.onloadend = (e) => {
        this.setState({ PreviewImgsrc: reader.result });
      };
    }
  };
  render() {
    return (
      <Popup title={"Modify Profile"} togglePopup={this.props.togglePopup}>
        <form method="POST" onSubmit={this.updateProfile}>
          <div className="prf_modif_main">
            <div className="prf_modif_img_h">
              {!this.state.PreviewImgsrc ? (
                <UnvProfileImage
                  size={"180px"}
                  username={this.props.user.username}
                  prf_image={this.props.user.profileImage}
                  uncc
                />
              ) : (
                <img src={this.state.PreviewImgsrc} alt="" id="modif_prv_img" />
              )}
              <input
                type="file"
                name="profile_image"
                onChange={this.imgUploadHandle}
              />
            </div>
            <div className="prf_modif_cmp">
              <div className="prf_modif_us">
                <p>{this.props.user.username}</p>
                <input
                  type="text"
                  placeholder="Change your name"
                  name="username"
                  onChange={this.handleInput}
                  autoComplete="off"
                />
              </div>
              <div className="prf_modif_dsc">
                <textarea
                  rows="5"
                  placeholder="Describe your self"
                  name="profileDescription"
                  onChange={this.handleInput}
                  autoComplete="off"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="mdf_acc_h">
            {this.state.loadingModify ? (
              <Loader customSpacing={"10px"} size={"6px"} mrr={"10px"} />
            ) : (
              <button
                className="bt_default_rm bt_tag hs_bt_tag"
                style={{ padding: "0.5em" }}
              >
                Change{" "}
              </button>
            )}
          </div>
        </form>
      </Popup>
    );
  }
}

export default ProfileModify;
