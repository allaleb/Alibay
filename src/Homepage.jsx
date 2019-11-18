import React, { Component } from "react";
import { connect } from "react-redux";
class UnconnectedHomepage extends Component {
  render = () => {
    return <div>Hello!</div>;
  };
}
let Homepage = connect()(UnconnectedHomepage);
export default Homepage;
