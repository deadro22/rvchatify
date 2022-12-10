import React, { Component } from "react";
import UnvProfileImage from "./../UnvProfileImage";

class UserListPageL extends Component {
  render() {
    return (
      <div className="ust_list_mn">
        {this.props.usersList.map((user, index) => (
          <React.Fragment key={index}>
            <div className="lst_it_us">
              <UnvProfileImage
                username={user.username}
                prf_image={user.profileImage}
                size={"45px"}
                f_size={"13px"}
              />
              <div className="us_ls_header">
                <h4>{user.username}</h4>
                <div>
                  <p>
                    {user.followers.length} <span>Followers</span>
                  </p>
                  <p className="mr-l-1">
                    {user.following.length} <span>Following</span>
                  </p>
                </div>
              </div>
              <div className="fl_bt_lst_hl">
                {!(user._id === this.props.authUser) && (
                  <button className="bt_default_rm">
                    <i
                      className={
                        user.followers.includes(this.props.authUser)
                          ? "fa fa-check"
                          : "fa fa-plus"
                      }
                    ></i>
                  </button>
                )}
                <button
                  className="bt_default_rm"
                  onClick={() =>
                    this.props.history.push("/profile/" + user.username)
                  }
                >
                  <i className="fa fa-arrow-right"></i>
                </button>
              </div>
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>
    );
  }
}

export default UserListPageL;
