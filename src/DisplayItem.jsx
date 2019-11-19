import React, { Component } from "react";
import { Link } from "react-router-dom";

class DisplayItem extends Component {
  render() {
    return (
      <div className="marketplace">
        <Link to={"/itemdetails/" + this.props.item._id}>
          <img src={this.props.item.frontendPath} />
        </Link>
        <div>{this.props.item.description}</div>
        <div>{this.props.item.price}</div>
        <div>{this.props.item.seller}</div>
      </div>
    );
  }
}
export default DisplayItem;
