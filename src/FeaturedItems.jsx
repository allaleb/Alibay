import React, { Component } from "react";
import { Link } from "react-router-dom";

class FeaturedItem extends Component {
  render = () => {
    return (
      <div className="feature-item">
        <Link to={"/itemdetails/" + this.props.item._id}>
          <img src={this.props.item.frontendPath} width="200px" />
        </Link>
        <div className="feature-name">{this.props.item.name}</div>
        <div className="feature-price">{this.props.item.price}</div>
      </div>
    );
  };
}

export default FeaturedItem;
