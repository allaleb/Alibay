import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UploadItem from "./UploadItem.jsx";

class UnconnectedCart extends Component {
  render = () => {
    return (
      <div>
        <div className="navbar">
          <Link className="link" to="/">
            HOME
          </Link>
        </div>
      </div>
    );
  };
}

let Cart = connect()(UnconnectedCart);

export default Cart;
