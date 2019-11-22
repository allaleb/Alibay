import React, { Component } from "react";
import { Link } from "react-router-dom";

class DisplayItem extends Component {
  render() {
    return (
      <div>
        <Link to={"/itemdetails/" + this.props.item._id}>
          <img src={this.props.item.thumbnailPath} />
        </Link>
        <div className="item-name">{this.props.item.name}</div>
        <div>{this.props.item.price}</div>
      </div>
    );
  }
}
export default DisplayItem;
