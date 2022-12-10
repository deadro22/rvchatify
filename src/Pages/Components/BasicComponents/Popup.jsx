import React, { Component } from "react";
import "./Styles/Popup.css";
import { Spring } from "react-spring/renderprops";

class Popup extends Component {
  render() {
    return (
      <Spring
        from={{ opacity: 0, transform: "scale(1.1)" }}
        to={{ opacity: 1, transform: "scale(1)" }}
        config={{ friction: 17, duration: 150 }}
      >
        {(props) => (
          <div className="pop_u_main" style={props}>
            <div className="p_hd_hld">
              <div className="pop_header">
                <h3>{this.props.title}</h3>
                <button onClick={this.props.togglePopup}>
                  <i className="fal fa-times"></i>
                </button>
              </div>
              {this.props.children}
            </div>
          </div>
        )}
      </Spring>
    );
  }
}

export default Popup;
