import React, { Component } from "react";
import axios from "axios";
import NotFoundComponent from "./Components/NotFoundComponent";
import "./Styles/PostMainPage.css";
import PostMainPageComponent from "./Components/PostMainPageComponent";
import io from "socket.io-client";
import helpers from "../Helpers";
import Loader from "./Components/BasicComponents/Loader";

class PostMainPage extends Component {
  state = {
    notfound: false,
    loading: true,
    post: {},
    privatePost: false,
  };
  async componentDidMount() {
    const socket = io.connect(helpers.getBackendLink() + "/post");
    socket.emit("joinPost", this.props.match.params.postId);
    try {
      const post = await axios.get(
        "/api/posts/rev/" + this.props.match.params.postId,
        { withCredentials: true }
      );
      this.setState({
        post: post.data.post,
        user: post.data.user,
        loading: false,
        socket,
      });
    } catch (e) {
      if (e.response.status === 403) {
        this.setState({ privatePost: true, loading: false });
      } else {
        this.setState({ notfound: true, loading: false });
      }
      console.log(e.response);
    }
  }
  render() {
    if (!this.state.loading) {
      if (this.state.notfound) {
        return (
          <NotFoundComponent
            title={"post not found"}
            body={
              "Sorry, we could not find this post maybe its owner removed it or it dosent exist. "
            }
          />
        );
      } else if (this.state.privatePost) {
        return (
          <NotFoundComponent
            title={"Private Post"}
            body={
              "Sorry, But the post owner's profile is private so you cant view this content unless you follow this user"
            }
          />
        );
      } else {
        return (
          <div className="flx_pst_mn_holder">
            <div className="pst_mn_holder">
              <PostMainPageComponent
                post={this.state.post}
                user={this.state.user}
                socket={this.state.socket}
                authUser={this.props.authUser.user.data}
              />
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className="flx_pst_mn_holder">
          <div className="pst_mn_holder">
            <Loader />
          </div>
        </div>
      );
    }
  }
}

export default PostMainPage;
