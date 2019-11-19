import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Homepage from "./Homepage.jsx";
import UploadItem from "./UploadItem.jsx";
import Cart from "./Cart.jsx";

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
            <Route exact={true} path="/" component={Homepage} />
            <Route exact={true} path="/signup" component={Signup} />
            <Route exact={true} path="/login" component={Login} />
            <Route exact={true} path="/cart" component={Cart} />
            <div></div>
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
