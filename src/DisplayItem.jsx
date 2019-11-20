import React, { Component } from "react";
import { Link } from "react-router-dom";

class DisplayItem extends Component {
  render() {
    return (
      <div>
        <Link to={"/itemdetails/" + this.props.item._id}>
          <div object-fit="fill">
            <img src={this.props.item.frontendPath} width="200px" />
          </div>
        </Link>
        <div>{this.props.item.name}</div>
        <div>{this.props.item.price}</div>
      </div>
    );
  }
}
export default DisplayItem;

// <div>{this.props.item.seller}</div>
