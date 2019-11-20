import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedLogout extends Component {
  handleLogout = event => {
    event.preventDefault();
    this.props.dispatch({
      type: "log-out"
    });
  };

  render = () => {
    return <button onClick={this.handleLogout}></button>;
  };
}
let Logout = connect()(UnconnectedLogout);
export default Logout;
