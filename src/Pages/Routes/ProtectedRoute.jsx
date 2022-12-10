import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import LoadingBarMain from "./../Components/LoadingBar";

class ProtectedRoute extends Component {
  state = {
    isAuthed: false,
    loading: true,
  };
  componentDidMount() {
    this.setState({
      isAuthed: this.props.isAuthed.isAuthed,
      loading: false,
      user: this.props.isAuthed.user,
    });
  }
  render() {
    return this.state.loading ? (
      <div>Loading...</div>
    ) : this.state.isAuthed ? (
      <React.Fragment>
        <LoadingBarMain loading={this.state.loading} />
        {this.props.navbar && <this.props.navbar />}
        <Route
          path={this.props.path}
          component={(props) => (
            <this.props.component
              {...props}
              user={this.state.user}
              socketConnect={this.props.socketConnect}
              authUser={this.props.isAuthed}
            />
          )}
          exact={this.props.exact}
        />
      </React.Fragment>
    ) : (
      <Redirect to="/login" />
    );
  }
}

export default ProtectedRoute;
