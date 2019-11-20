import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
          <Link className="link" to="/profile">
            PROFILE
          </Link>
          <Link className="link" to="/cart">
            CART
          </Link>
        </div>
        <h1 className="store-name">Jasallanda Sweet Market</h1>
        <Link className="link" to="/marketplace">
          MARKETPLACE
        </Link>
      </div>
    );
  };
}

let Homepage = connect()(UnconnectedHomepage);
export default Homepage;
