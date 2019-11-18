import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UploadItem from "./UploadItem.jsx";

class UnconnectedCart extends Component {
  render = () => {
    return (
      <div>
        <Link to="/">Homepage</Link>
      </div>
    );
  };
}

let Cart = connect()(UnconnectedCart);
export default Cart;