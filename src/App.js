import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import logo from "./logo.svg";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";

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

  render() {
    return (
      <div className="App">
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
