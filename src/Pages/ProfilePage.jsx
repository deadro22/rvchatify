import React, { Component } from "react";
import axios from "axios";
import "./Styles/ProfilePage.css";
import ProfilePost from "./Components/ProfilePost";
import ProfileHeader from "./Components/ProfileHeader";
import NotFoundComponent from "./Components/NotFoundComponent";
import { Spring } from "react-spring/renderprops";
import ProfileModify from "./Components/ProfileComponents/ProfileModify";
import Helpers from "../Helpers";
import Loader from "./Components/BasicComponents/Loader";

class ProfilePage extends Component {
  state = {
    loading: true,
    notFound: false,
    skipCount: 0,
    newLoading: false,
    postLimit: false,
    canLoadData: true,
    postsCount: 0,
    modifyActive: false,
  };
  async componentDidMount() {
    try {
      const { username } = this.props.match.params;
      const data = await axios.get("/api/users/profile/" + username, {
        withCredentials: true,
      });
      this.setState({
        user: data.data.us_prf,
        loading: false,
        skipCount: data.data.us_prf.posts.length,
        postsCount: data.data.postsCount,
      });
      document.title = "Profile: " + username;
      if (this.state.postLimit !== true && this.state.canLoadData) {
        document.addEventListener("scroll", async () => {
          let scrollCondition =
            document.scrollingElement.scrollHeight -
              document.scrollingElement.scrollTop ===
            document.scrollingElement.clientHeight;
          if (scrollCondition) {
            this.setState({ newLoading: true, canLoadData: false });
            const newProfilePosts = await axios.get(
              "/api/users/profile/" + this.props.match.params.username,
              {
                withCredentials: true,
                params: { skp_count: this.state.skipCount },
              }
            );
            if (newProfilePosts.data.us_prf.posts.length > 0) {
              const h_p = [...this.state.user.posts];
              const ccp = h_p.concat(newProfilePosts.data.us_prf.posts);
              const nwUser = { ...this.state.user };
              nwUser.posts = ccp;
              this.setState({
                user: nwUser,
                skipCount: ccp.length,
                newLoading: false,
                canLoadData: true,
              });
            } else {
              this.setState({
                postLimit: true,
                newLoading: false,
                canLoadData: false,
              });
            }
          }
        });
      }
    } catch (e) {
      console.log(e);
      this.setState({ notFound: true, loading: false });
    }
  }
  toggleProfileModify = () => {
    const srcToggle = Helpers.toggleSearch(this.state.modifyActive);
    this.setState({ modifyActive: srcToggle });
  };
  render() {
    if (this.state.loading) {
      return <Loader />;
    } else {
      if (this.state.notFound) {
        return (
          <NotFoundComponent
            title={"Profile Not found"}
            body={
              "We could not find this profile, Maybe it was deleted by its owner or does not exist"
            }
          />
        );
      } else {
        return (
          <div className="prf_cont_hld_main">
            <div className="prf_cont_hld">
              {this.state.modifyActive && (
                <ProfileModify
                  togglePopup={this.toggleProfileModify}
                  user={this.state.user}
                  history={this.props.history}
                />
              )}
              <Spring
                config={{ duration: 150 }}
                from={{ opacity: 0, transform: "scale(1.1)" }}
                to={{ opacity: 1, transform: "scale(1)" }}
              >
                {(props) => (
                  <div style={props}>
                    <ProfileHeader
                      user={this.state.user}
                      authUser={this.props.user}
                      history={this.props.history}
                      postsCount={this.state.postsCount}
                      toggleModify={this.toggleProfileModify}
                    />
                    <div className="prf_mn_holder">
                      <ProfilePost
                        history={this.props.history}
                        user={this.state.user}
                        authUser={this.props.user}
                      />
                    </div>
                  </div>
                )}
              </Spring>
            </div>
          </div>
        );
      }
    }
  }
}

export default ProfilePage;
