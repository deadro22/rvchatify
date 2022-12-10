import React, { Component } from "react";
import Helpers from "../../../Helpers";

class Like extends Component {
  state = {
    likesCount: 0,
  };
  componentDidMount() {
    this.likeHeartRef = React.createRef();
    this.setState({ likesCount: this.props.likes.length });
    //On like (server) inc likes
    this.props.socket.on("likeRes", (data) => {
      if (data.like) {
        this.setState({ likesCount: this.state.likesCount + 1 });
      } else {
        this.setState({ likesCount: this.state.likesCount - 1 });
      }
    });
    //On like (server) changeColor
    this.props.socket.on("likeStyleRes", (data) => {
      if (data.like) {
        this.likeHeartRef.current.className = "fa fa-heart";
        this.likeHeartRef.current.style.color = "red";
      } else {
        this.likeHeartRef.current.className = "fal fa-heart";
        this.likeHeartRef.current.style.color = "white";
      }
    });
  }
  render() {
    const { likes, postId, user, socket } = this.props;
    return (
      <p>
        <i
          className={likes.includes(user._id) ? "fa fa-heart" : "fal fa-heart"}
          onClick={() => Helpers.likePost(postId, user, socket)}
          ref={this.likeHeartRef}
          style={{
            color: likes.includes(this.props.user._id) ? "red" : "white",
          }}
        ></i>{" "}
        {this.state.likesCount}
      </p>
    );
  }
}

export default Like;
