import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import logo from "./logo.svg";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      userData: null,
    };
  }

  submitUser = (userObj) => {
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((users) => {
        const user = users.find((user) => user.username === userObj.username);
        fetch(`http://localhost:3000/users/${user.id}`)
          .then((response) => response.json())
          .then((userData) => {
            this.setState({ userData });
          });
      });
  };

  handleLogout = (event) => {
    this.setState({ userData: null });
  };

  render() {
    return (
      <div className="App">
        {this.state.userData && (
          <NavBar
            userData={this.state.userData}
            handleLogout={this.handleLogout}
          />
        )}
        <Route
          exact
          path="/"
          render={() => (
            <Login
              submitUser={this.submitUser}
              userData={this.state.userData}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
