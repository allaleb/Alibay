import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedLogout extends Component {
  constructor(props) {
    super(props);
  }
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
