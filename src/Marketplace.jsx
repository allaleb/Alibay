import React, { Component } from "react";
import { Link } from "react-router-dom";

class Marketplace extends Component {
  render() {
    return (
      <div>
        <div className="navbar-page">
          <div className="store-mini">Jasallanda Sweet Market</div>
          <Link className="link" to="/">
            HOME
          </Link>
        </div>
        <div className="marketplace">
          <div>
            <Link to={"/itemdetails" + this.props.id}>
              <img src={this.props.frontendPath} height="100px" />
            </Link>
            <div>Description</div>
            <div>Price</div>
            <Link to={"/seller/" + this.props.sellerId}>
              Seller information
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Marketplace;
