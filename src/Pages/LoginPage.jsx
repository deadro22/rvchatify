import React, { Component } from "react";
import "./Styles/Auth.css";
import auth from "../auth-guard";

class LoginPage extends Component {
  componentDidMount() {
    document.title = "Login";
  }
  state = {};
  logUserOnSubmit = async (e) => {
    e.preventDefault();
    const { error } = auth.verifyLoginData(this.state);
    if (error) {
      console.log(error.details[0].message);
    } else {
      await auth.login(this.state);
      window.location.href = "/";
    }
  };
  handleInputUser = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div className="lg_main_hl">
        <form
          method="POST"
          className="lg_form_sbn"
          onSubmit={this.logUserOnSubmit}
        >
          <div className="form_inter_bt">
            <h2>Login</h2>
          </div>
          <input
            type="text"
            name="ident"
            placeholder="Email or Username"
            className="otln"
            autoComplete="off"
            onChange={this.handleInputUser}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="otln"
            autoComplete="off"
            onChange={this.handleInputUser}
          />
          <input type="submit" readOnly className="bt_default_rm" />
        </form>
      </div>
    );
  }
}

export default LoginPage;
