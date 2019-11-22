import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import UploadItem from "./UploadItem.jsx";
import ItemReviews from "./ItemReviews.jsx";

class UnconnectedItemDetails extends Component {
  handleAdd = item => {
    this.props.dispatch({ type: "add-success", item: item });
  };
  buyOne = item => {
    this.props.dispatch({ type: "add-success", item: item });
  };
  logOutHandler = () => {
    this.props.dispatch({ type: "log-out" });
  };
  render = () => {
    //console.log(this);
    if (this.props.state.loggedIn === true) {
      let item = this.props.items.find(item => {
        return item._id === this.props.itemId;
      });
      return (
        <div>
          <div className="navbar-page">
            <div className="store-mini">Jasallanda Sweet Market</div>
            <Link className="link" to="/marketplace">
              Back
            </Link>
            <Link className="link" to="/myprofile">
              My Profile
            </Link>
            <Link className="link" to="/cart">
              Cart
            </Link>
            <Link className="link" to="/" onClick={this.logOutHandler}>
              Log Out
            </Link>
            <Link className="link" to="/">
              HOME
            </Link>
          </div>
          <div>
            <h3>{item.name}</h3>
            <h3>
              <Link className="link" to={"/profile/" + item.seller}>
                {item.seller}
              </Link>
            </h3>
            <img src={item.frontendPath} height="200px" />
            <h3>{item.description}</h3>
            <h3>{item.price}</h3>
            <h3>{item.inStock}</h3>
            <div>Review this item</div>
            <ItemReviews item={item} />
            <button
              onClick={() => {
                this.handleAdd(item);
              }}
            >
              Add to cart
            </button>
            <button>
              <Link
                to="/cart"
                onClick={() => {
                  this.buyOne(item);
                }}
                className="button-link"
              >
                Buy now
              </Link>
            </button>
          </div>
        </div>
      );
    }
    return <Redirect to="/" />;
  };
}

let mapStateToProps = state => {
  return { items: state.items, state };
};

let ItemDetails = connect(mapStateToProps)(UnconnectedItemDetails);

export default ItemDetails;
