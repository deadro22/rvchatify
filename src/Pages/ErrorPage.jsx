import React, { Component } from "react";

class ErrorPage extends Component {
  componentDidMount() {
    document.title = "Error: Page Unavailable";
  }
  render() {
    return <div>Not Found</div>;
  }
}

export default ErrorPage;
