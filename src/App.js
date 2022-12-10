import React, { Component } from "react";
import "./App.css";
import "./FontAwesome/css/all.min.css";
import { Redirect, Route, Switch } from "react-router-dom";
import MainNavbar from "./Pages/Components/MainNav";
import MainHomePage from "./Pages/HomePage";
import ProfilePage from "./Pages/ProfilePage";
import ErrorPage from "./Pages/ErrorPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import ProtectedRoute from "./Pages/Routes/ProtectedRoute";
import AuthRoute from "./Pages/Routes/AuthRoute";
import auth from "./auth-guard";
import PostMainPage from "./Pages/PostMainPage";
import MainSearchPage from "./Pages/SearchPage";
import SreamingPage from "./Pages/StreamingPage";

class App extends Component {
  state = {
    loading: true,
    isAuthed: false,
  };
  async componentDidMount() {
    try {
      const isAuthed = await auth.isAuthenticated();
      this.setState({ isAuthed, loading: false });
    } catch (e) {
      this.setState({ isAuthed: false, loading: false });
    }
  }

  navBar_ss = () => {
    return <MainNavbar user={this.state.isAuthed.user || null} />;
  };

  render() {
    return (
      <div className="main_app">
        {!this.state.loading && (
          <React.Fragment>
            <Switch>
              <ProtectedRoute
                path="/streaming/:streamId"
                component={SreamingPage}
                isAuthed={this.state.isAuthed}
                navbar={this.navBar_ss}
              />
              <ProtectedRoute
                path="/post/:postId"
                component={PostMainPage}
                isAuthed={this.state.isAuthed}
              />
              <ProtectedRoute
                path="/profile/:username"
                component={ProfilePage}
                isAuthed={this.state.isAuthed}
                navbar={this.navBar_ss}
              />
              <AuthRoute
                path="/register"
                component={RegisterPage}
                isAuthed={this.state.isAuthed}
                navbar={this.navBar_ss}
              />
              <ProtectedRoute
                path="/search"
                component={MainSearchPage}
                isAuthed={this.state.isAuthed}
                navbar={this.navBar_ss}
              />
              <AuthRoute
                path="/login"
                component={LoginPage}
                isAuthed={this.state.isAuthed}
                navbar={this.navBar_ss}
              />
              <ProtectedRoute
                path="/"
                exact
                component={MainHomePage}
                isAuthed={this.state.isAuthed}
                navbar={this.navBar_ss}
              />
              <React.Fragment>
                {this.navBar_ss()}
                <Route path="/error/nfd" component={ErrorPage} />
                <Redirect to="/error/nfd" />
              </React.Fragment>
            </Switch>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default App;
