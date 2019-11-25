import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import ItemReviews from "./ItemReviews.jsx";

class UnconnectedItemDetails extends Component {
  handleAdd = item => {
    window.alert("Item added to cart!");
    this.props.dispatch({ type: "add-success", item: item });
  };
  buyOne = item => {
    this.props.dispatch({ type: "add-success", item: item });
  };
  logOutHandler = () => {
    this.props.dispatch({ type: "log-out" });
  };
  sellerHandler = seller => {
    this.props.dispatch({ type: "set-seller", seller: seller });
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
            <div className="store-mini">
              <Link className="link-store" to="/">
                Jasallanda Sweet Market
              </Link>
            </div>
            <Link className="link" to="/marketplace">
              MARKETPLACE
            </Link>
            <Link className="link" to="/myprofile">
              MY PROFILE
            </Link>
            <Link className="link" to="/cart">
              CART
            </Link>
            <Link className="link" to="/" onClick={this.logOutHandler}>
              LOG OUT
            </Link>
          </div>
          <div className="item-details">
            <h1 className="feature-name">{item.name}</h1>
            <h3 className="feature-price">
              Made By:
              <Link
                className="link"
                to={"/profile/" + item.seller}
                onClick={() => {
                  this.sellerHandler(item.seller);
                }}
              >
                {item.seller}
              </Link>
            </h3>
            <img src={item.frontendPath} height="200px" />
            <h3 className="feature-price">{item.description}</h3>
            <h3 className="feature-price">{item.price}</h3>
            <h3 className="feature-price">{item.inStock}</h3>
            <div className="order-items">
              <button
                onClick={() => {
                  this.handleAdd(item);
                }}
                className="button-add"
              >
                ADD TO CART
              </button>
              <button>
                <Link
                  to="/cart"
                  onClick={() => {
                    this.buyOne(item);
                  }}
                  className="button-buy"
                >
                  BUY NOW
                </Link>
              </button>
            </div>
            <div className="review-item">
              <h4>Reviews for this item:</h4>
              <ItemReviews item={item} />
            </div>
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
