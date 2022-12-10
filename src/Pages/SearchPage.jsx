import React, { Component } from "react";
import query from "query-string";
import axios from "axios";
import UserListPageL from "./Components/SearchComponents/UsersListPage";
import Loader from "./Components/BasicComponents/Loader";
import NotFoundComponent from "./Components/NotFoundComponent";
import "./Components/SearchComponents/Search.css";

class MainSearchPage extends Component {
  state = {
    loading: true,
    notFound: false,
  };
  async componentDidMount() {
    try {
      const searchQuery = query.parse(this.props.location.search);
      if (!searchQuery.sch_q || searchQuery.sch_q === "") {
        this.props.history.replace("/");
      } else {
        const l_users = await axios.get("/api/users/profiles/lst", {
          withCredentials: true,
          params: { username: searchQuery.sch_q },
        });
        this.setState({
          loading: false,
          usersList: l_users.data.prf_user_list,
          authUser: l_users.data.authuser,
        });
      }
    } catch (e) {
      this.setState({ loading: false, notFound: true });
      console.log(e.response);
    }
  }
  render() {
    if (!this.state.loading) {
      if (!this.state.notFound) {
        return (
          <div className="us_search_lst">
            <UserListPageL
              usersList={this.state.usersList}
              history={this.props.history}
              authUser={this.state.authUser}
            />
          </div>
        );
      } else {
        return (
          <NotFoundComponent
            title={"No users found"}
            body={"We could not find any users"}
          />
        );
      }
    } else {
      return <Loader />;
    }
  }
}

export default MainSearchPage;
