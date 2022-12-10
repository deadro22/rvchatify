import React, { Component } from "react";
import auth from "../auth-guard";

class RegisterPage extends Component {
  componentDidMount() {
    document.title = "Register";
  }
  state = {};
  logUserOnSubmit = async (e) => {
    e.preventDefault();
    const { error } = auth.verifyRegisterData(this.state);
    if (error) {
      console.log(error.details[0].message);
    } else {
      await auth.Register(this.state);
      this.props.history.replace("/profile/" + this.state.username);
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
            <h2>Register</h2>
          </div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="otln"
            autoComplete="off"
            onChange={this.handleInputUser}
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
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

export default RegisterPage;
