import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UploadItem from "./UploadItem.jsx";

class UnconnectedItemDetails extends Component {
  render = () => {
    let item = this.props.items.find(item => {
      return item._id === this.props.itemId;
    });
    return (
      <div>
        ITEM DETAILS ID: {this.props.itemId}
        <h3>{item.name}</h3>
        <h3>{item.price}</h3>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { items: state.items };
};

let ItemDetails = connect(mapStateToProps)(UnconnectedItemDetails);

export default ItemDetails;
