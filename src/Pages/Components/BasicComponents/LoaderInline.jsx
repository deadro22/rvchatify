import React, { Component } from "react";

class InlineLoader extends Component {
  render() {
    const { customSpacing, size, mrr } = this.props;
    return (
      <div className="lds_hld">
        <div
          class="loaderIn"
          style={{
            margin: customSpacing ? customSpacing + " auto" : "50px auto",
            fontSize: size || "8px",
            marginRight: mrr || "auto",
          }}
        >
          Loading...
        </div>
      </div>
    );
  }
}

export default InlineLoader;
