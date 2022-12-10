import React, { Component } from "react";
import "../Styles/MainNav.css";
import auth from "../../auth-guard";
import { Link, withRouter } from "react-router-dom";
import NavSearch from "./NavbarComponents/NavSearch";
import Helpers from "../../Helpers";

class MainNavbar extends Component {
  state = {
    searchActive: false,
  };
  handleLogout = async () => {
    await auth.logout();
    window.location.href = "/login";
  };
  toggleSearch = () => {
    const srcToggle = Helpers.toggleSearch(this.state.searchActive);
    this.setState({ searchActive: srcToggle });
  };
  render() {
    return (
      <div className="navBar_main_cl">
        <React.Fragment>
          <div className="navBar_logo_hld">
            <Link to="/" className="default_lnk_rm">
              <i className="fab fa-foursquare"></i>
            </Link>
          </div>
          <div className="inter_navBar_mn">
            {this.props.user !== null ? (
              <React.Fragment>
                <Link to="/" className="default_lnk_rm">
                  <i className="fal fa-home"></i>
                </Link>
                <div className="default_lnk_rm" onClick={this.toggleSearch}>
                  <i className="fal fa-search"></i>
                </div>{" "}
                <Link to="/explore" className="default_lnk_rm">
                  <i className="fal fa-compass"></i>
                </Link>
                <Link
                  to={"/profile/" + this.props.user.data.username}
                  className="default_lnk_rm"
                >
                  <i className="fal fa-user"></i>
                </Link>
                <div>
                  <i className="fal fa-bell"></i>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Link to="/login" className="default_lnk_rm">
                  <i className="fal fa-sign-in-alt"></i>
                </Link>
                <Link to="/register" className="default_lnk_rm">
                  <i className="fal fa-plus"></i>
                </Link>
              </React.Fragment>
            )}
          </div>
          <div className="navBar_drp">
            {this.props.user !== null && (
              <button
                className="bt_default_rm bt_main_b"
                onClick={this.handleLogout}
              >
                <i className="fa fa-cog"></i>
              </button>
            )}
          </div>
        </React.Fragment>
        {this.state.searchActive === true && (
          <NavSearch toggleSearch={this.toggleSearch} />
        )}
      </div>
    );
  }
}

export default withRouter(MainNavbar);
