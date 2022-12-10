import React, { Component } from "react";

class PrivateProfile extends Component {
  render() {
    return (
      <div className="prv_prf_access">
        <i
          style={{ fontSize: "50px", marginBottom: "10px" }}
          className="fal fa-lock"
        ></i>
        <p>Sorry this profile is private</p>
        <p>Follow this user to see their content</p>
      </div>
    );
  }
}

export default PrivateProfile;
