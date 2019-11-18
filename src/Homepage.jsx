import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UploadItem from "./UploadItem.jsx";

class UnconnectedHomepage extends Component {
  render = () => {
    return (
      <div>
        <h1>AJA</h1>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
        <UploadItem />
      </div>
    );
    <UploadItem />;
  };
}

let Homepage = connect()(UnconnectedHomepage);
export default Homepage;
