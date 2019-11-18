import React, { Component } from "react";
import { connect } from "react-redux";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";

class UnconnectedApp extends Component {
  render = () => {
    if (this.props.login) {
      return (
        <div>
          <div>Homepage</div>
        </div>
      );
    }
    return (
      <div>
        <div>
          <h1>Signup</h1>
          <Signup />
          <div></div>
          <h1>Login</h1>
          <Login />
        </div>
      </div>
    );
  };
}
let mapStateToProps = state => {
  return { login: state.loggedIn };
};

let App = connect(mapStateToProps)(UnconnectedApp);
export default App;
