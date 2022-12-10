import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Spring } from "react-spring/renderprops";

class NotFoundComponent extends Component {
  render() {
    return (
      <Spring
        from={{ opacity: 0, transform: "scale(1.2)" }}
        to={{ opacity: 1, transform: "scale(1)" }}
      >
        {(props) => (
          <div style={props}>
            <div className="er_prf_nfd_main">
              <i className="fal fa-exclamation-circle"></i>
              <h2>{this.props.title}</h2>
              <p>
                {this.props.body}{" "}
                <Link className="cst_link" to="/">
                  Home
                </Link>
              </p>
            </div>
          </div>
        )}
      </Spring>
    );
  }
}

export default NotFoundComponent;
