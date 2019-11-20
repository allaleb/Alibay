import React, { Component } from "react";
import { Link } from "react-router-dom";

class FeaturedItem extends Component {
  render = () => {
    return (
      <div>
        <Link to={"/itemdetails/" + this.props.item._id}>
          <img src={this.props.item.frontendPath} width="200px" />
        </Link>
        <div>{this.props.item.name}</div>
        <div>{this.props.item.price}</div>
      </div>
    );
  };
}

export default FeaturedItem;
