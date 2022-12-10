import React, { Component } from "react";
import "./Styles/Loader.css";

class Loader extends Component {
  render() {
    const { customSpacing, size, mrr } = this.props;
    return (
      <div className="lds_hld">
        <div
          className="loader"
          style={{
            margin: customSpacing ? customSpacing + " auto" : "50px auto",
            fontSize: size || "8px",
            marginRight: mrr || "auto",
          }}
        ></div>
      </div>
    );
  }
}

export default Loader;
