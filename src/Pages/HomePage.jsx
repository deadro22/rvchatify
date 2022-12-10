import React, { Component } from "react";
import Post from "./Components/Post";
import "./Styles/Home.css";
import "./Components/HomeComponents/Styles/HomeComponentsStyles.css";
import axios from "axios";
import io from "socket.io-client";
import Loader from "./Components/BasicComponents/Loader";
import { Spring } from "react-spring/renderprops";
import Helpers from "../Helpers";

class MainHomePage extends Component {
  state = {
    loading: true,
    skipCount: 0,
    newLoading: false,
    postLimit: false,
    canLoadData: true,
  };
  async componentDidMount() {
    document.title = "Chatify";
    const homePosts = await axios.get("/api/users/home", {
      withCredentials: true,
    });
    const socket = io.connect(Helpers.getBackendLink() + "/post");
    this.setState({
      posts: homePosts.data.homePosts,
      loading: false,
      socket,
      authUser: homePosts.data.authUser,
      skipCount: homePosts.data.homePosts.length,
    });
    if (this.state.postLimit !== true && this.state.canLoadData) {
      document.addEventListener("scroll", async () => {
        await Helpers.loadOnFetchScroll(
          this.state,
          "/api/users/home",
          () => {
            this.setState({ newLoading: true, canLoadData: false });
          },
          (newStatePost) => {
            this.setState(newStatePost);
          }
        );
      });
    }
  }
  render() {
    const { posts, authUser, socket } = this.state;
    if (this.state.loading) {
      return (
        <div className="home_main_hld">
          <Loader />
        </div>
      );
    } else {
      return (
        <div className="home_main_hld">
          <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
            {(props) =>
              posts.length > 0 ? (
                <div style={props}>
                  {posts.map((post, index) => (
                    <div style={{ marginBottom: "3em" }} key={index}>
                      <Post
                        post={post}
                        history={this.props.history}
                        socket={socket}
                        user={authUser}
                        commentsCount={post.postComments[0].comments}
                        custom={true}
                      />
                    </div>
                  ))}
                  {this.state.newLoading && !this.state.postLimit && (
                    <Loader customSpacing={"0px"} />
                  )}
                </div>
              ) : (
                <div>
                  <p>No posts</p>
                </div>
              )
            }
          </Spring>
        </div>
      );
    }
  }
}

export default MainHomePage;
