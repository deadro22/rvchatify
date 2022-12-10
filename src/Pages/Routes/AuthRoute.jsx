import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

class AuthRoute extends Component {
  state = {
    isAuthed: false,
    loading: true,
  };
  componentDidMount() {
    this.setState({ isAuthed: this.props.isAuthed.isAuthed, loading: false });
  }
  render() {
    return this.state.loading ? (
      <div>Loading...</div>
    ) : !this.state.isAuthed ? (
      <React.Fragment>
        {this.props.navbar && <this.props.navbar />}
        <Route
          path={this.props.path}
          component={this.props.component}
          exact={this.props.exact}
        />
      </React.Fragment>
    ) : (
      <Redirect to={this.props.redirectPath || "/"} />
    );
  }
}

export default AuthRoute;
