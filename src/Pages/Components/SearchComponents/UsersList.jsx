import React, { Component } from "react";
import "../SearchComponents/Search.css";
import { Link } from "react-router-dom";
import UnvProfileImage from "./../UnvProfileImage";

class UsersList extends Component {
  render() {
    return (
      <div className="src_res_list">
        {this.props.usersList.map((user) => (
          <div key={user._id}>
            <UnvProfileImage
              size={"60px"}
              username={user.username}
              prf_image={user.profileImage}
            />
            <div>
              <p>{user.username}</p>
              <p>{user.followers.length} Followers</p>
            </div>
            <Link
              className="prf_acc_lnk"
              to={"/profile/" + user.username}
              onClick={this.props.toggleSearch}
            >
              <i className="fa fa-arrow-alt-circle-right"></i>
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

export default UsersList;
