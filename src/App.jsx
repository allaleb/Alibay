import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Homepage from "./Homepage.jsx";
import UploadItem from "./UploadItem.jsx";

// renderSignUp = routerData => {
//   return;
// };

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
      <BrowserRouter>
        <div>
          <div>
            {/* <Homepage /> */}
            <Route exact={true} path="/" component={Homepage} />
            <Route exact={true} path="/signup" component={Signup} />
            <Route exact={true} path="/login" component={Login} />
            <div></div>
            {/* <h1>Login</h1>
            <Login /> */}
          
          </div>
        </div>
      </BrowserRouter>
    );
  };
}
let mapStateToProps = state => {
  return { login: state.loggedIn };
};

let App = connect(mapStateToProps)(UnconnectedApp);
export default App;
