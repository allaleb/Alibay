import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UploadItem from "./UploadItem.jsx";

class UnconnectedHomepage extends Component {
  render = () => {
    return (
      <div>
        <div className="navbar-home">
          <Link className="link" to="/signup">
            SIGN UP
          </Link>
          <Link className="link" to="/login">
            LOG IN
          </Link>
          <Link className="link" to="/cart">
            CART
          </Link>
        </div>
        <h1 className="store-name">Jasallanda Sweet Market</h1>
        <Link className="link" to="/marketplace">
          MARKETPLACE
        </Link>
        <div>
          <UploadItem />
        </div>
      </div>
    );
  };
}

let Homepage = connect()(UnconnectedHomepage);
export default Homepage;
