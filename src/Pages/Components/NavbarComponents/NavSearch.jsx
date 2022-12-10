import React, { Component } from "react";
import axios from "axios";
import UsersList from "./../SearchComponents/UsersList";
import { withRouter } from "react-router-dom";
import Joi from "joi";
import Popup from "./../BasicComponents/Popup";

class NavSearch extends Component {
  state = {
    srcValue: "",
    searchLoading: false,
  };
  searchUserOnInput = async (e) => {
    try {
      const { error } = Joi.validate(
        { srcValue: this.state.srcValue },
        {
          srcValue: Joi.string().required(),
        }
      );
      if (!error) {
        this.setState({ searchLoading: true });
        const usersList = await axios.get("/api/users/profiles/lst", {
          withCredentials: true,
          params: { username: this.state.srcValue },
        });
        this.setState({
          usersList: usersList.data.prf_user_list,
          searchLoading: false,
        });
      }
    } catch (e) {
      console.log(e.response);
    }
  };
  searchUser = async (e) => {
    e.preventDefault();
    const { error } = Joi.validate(
      { srcValue: this.state.srcValue },
      {
        srcValue: Joi.string().required(),
      }
    );
    if (!error) {
      this.props.toggleSearch();
      this.props.history.push("/search?sch_q=" + this.state.srcValue);
    }
  };
  fillSearchValue = (e) => {
    this.setState({ srcValue: e.target.value });
  };
  render() {
    return (
      <Popup togglePopup={this.props.toggleSearch} title={"Search"}>
        <div>
          <form className="fr_search" onSubmit={this.searchUser}>
            <input
              type="text"
              placeholder="search by username, games, rank"
              onChange={(e) => {
                this.fillSearchValue(e);
                this.searchUserOnInput();
              }}
            />
          </form>
          {this.state.usersList && this.state.usersList.length > 0 && (
            <UsersList
              usersList={this.state.usersList}
              toggleSearch={this.props.toggleSearch}
            />
          )}
        </div>
      </Popup>
    );
  }
}

export default withRouter(NavSearch);
