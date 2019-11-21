import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class UnconnectedFeaturedItem extends Component {
  render = () => {
    if (!this.props.loggedIn) {
      return (
        <div className="feature-item">
          <Link to={"/login"}>
            <img src={this.props.item.thumbnailPath} />
          </Link>
          <div className="feature-name">{this.props.item.name}</div>
          <div className="feature-price">{this.props.item.price}</div>
        </div>
      );
    }
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

let mapStateToProps = state => {
  return { loggedIn: state.loggedIn };
};

let FeaturedItem = connect(mapStateToProps)(UnconnectedFeaturedItem);

export default FeaturedItem;
