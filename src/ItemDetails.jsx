import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UploadItem from "./UploadItem.jsx";

class UnconnectedItemDetails extends Component {
  handleAdd = event => {
    this.props.dispatch({ type: "add-success" });
  };

  render = () => {
    let item = this.props.items.find(item => {
      return item._id === this.props.itemId;
    });
    return (
      <div>
        <div className="navbar-page">
          <div className="store-mini">Jasallanda Sweet Market</div>
          <Link className="link" to="/">
            HOME
          </Link>
        </div>
        <div>
          <h3>{item.name}</h3>
          <h3>{item.seller}</h3>
          <img src={item.frontendPath} />
          <h3>{item.description}</h3>
          <h3>{item.price}</h3>
          <h3>{item.reviews}</h3>
          <button onCLick={this.handleAdd}>Add to cart</button>
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { items: state.items };
};

let ItemDetails = connect(mapStateToProps)(UnconnectedItemDetails);

export default ItemDetails;
