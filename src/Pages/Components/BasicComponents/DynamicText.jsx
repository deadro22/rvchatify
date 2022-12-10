import React, { Component } from "react";
import { Link } from "react-router-dom";

class DynamicText extends Component {
  findAndSetLinks = () => {
    const text = this.props.content;
    const newtext = text.split(" ");
    for (let i = 0; i <= newtext.length - 1; i++) {
      if (newtext[i].startsWith("@")) {
        newtext[i] = (
          <Link
            className="default_lnk_rm bt_tag at_bt_tag"
            key={i}
            to={"/profile/" + newtext[i].replace("@", "")}
          >
            {newtext[i]}
          </Link>
        );
      } else if (newtext[i].startsWith("#")) {
        const valRef = newtext[i];
        newtext[i] = (
          <button
            className="bt_tag hs_bt_tag"
            key={i}
            onClick={() =>
              this.props.history.push(
                `/search?sch_q=${valRef.replace("#", "")}`
              )
            }
          >
            {newtext[i]}
          </button>
        );
      } else {
        newtext[i] = newtext[i] + " ";
      }
    }
    return newtext;
  };
  render() {
    return <p className="dn_text_hld">{this.findAndSetLinks()}</p>;
  }
}

export default DynamicText;
