import React, { Component } from "react";
import { connect } from "react-redux";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Homepage from "./Homepage.jsx";
import UploadItem from "./UploadItem.jsx";
class UnconnectedApp extends Component {
  render = () => {
    if (this.props.login) {
      return (
        <div>
          <Homepage />
        </div>
      );
    }
    return (
      <div>
        <div>
          <h1>Homepage</h1>
          <Homepage />
          <h1>Signup</h1>
          <Signup />
          <div></div>
          <h1>Login</h1>
          <Login />
          <UploadItem />
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
