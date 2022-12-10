import React, { Component } from "react";
import { Link } from "react-router-dom";

class UnvProfileImage extends Component {
  render() {
    if (this.props.prf_image) {
      return !this.props.uncc ? (
        <Link
          className="default_lnk_rm"
          style={{ height: this.props.size }}
          to={"/profile/" + this.props.username}
        >
          <img
            src={this.props.prf_image}
            width={this.props.size}
            height={this.props.size}
            alt=""
            style={{
              borderRadius: "150px",
              border: "2px solid rgb(100, 100, 100)",
              objectFit: "cover",
            }}
          />
        </Link>
      ) : (
        <img
          src={this.props.prf_image}
          width={this.props.size}
          height={this.props.size}
          alt=""
          style={{
            borderRadius: "150px",
            border: "2px solid rgb(100, 100, 100)",
            objectFit: "cover",
          }}
        />
      );
    } else {
      return !this.props.uncc ? (
        <Link
          className="default_lnk_rm"
          style={{ height: this.props.size, margin: 0 }}
          to={"/profile/" + this.props.username}
        >
          <div
            className="unv_prof_pic_hld"
            style={{
              width: this.props.size,
              height: this.props.size,
              fontSize: this.props.f_size,
            }}
          >
            <h1>{this.props.username[0].toUpperCase()}</h1>
          </div>
        </Link>
      ) : (
        <div
          className="unv_prof_pic_hld"
          style={{
            width: this.props.size,
            height: this.props.size,
            fontSize: this.props.f_size,
          }}
        >
          <h1>{this.props.username[0].toUpperCase()}</h1>
        </div>
      );
    }
  }
}

export default UnvProfileImage;
