import React, { Component } from "react";
import "../Styles/LoadingBarMain.css";
import { Spring } from "react-spring/renderprops";

class LoadingBarMain extends Component {
  render() {
    return (
      this.props.loading && (
        <div className="bar_mn_full">
          <Spring from={{ width: "0%" }} to={{ width: "100%" }}>
            {(props) => <div style={props}></div>}
          </Spring>
        </div>
      )
    );
  }
}

export default LoadingBarMain;
