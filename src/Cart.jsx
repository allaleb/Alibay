import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import "./main.css";

class UnconnectedCart extends Component {
  constructor() {
    super();
    this.state = {
      totalPrice: 0
    };
  }
  componentDidMount = () => {
    this.priceHandler();
  };
  priceHandler = () => {
    let totalPrice = 0;
    this.props.cart.forEach(item => {
      console.log(item);
      totalPrice = totalPrice + Number(item.price);
    });
    this.setState({ totalPrice: totalPrice });
  };
  removeItemHandler = index => {
    let copy = this.props.cart.slice();
    copy.splice(index, 1);
    console.log(copy);
    this.props.dispatch({
      type: "remove-item",
      cart: copy
    });
  };
  isCartEmpty = () => {
    if (this.props.cart.length === 0) {
      return <h4 className="empty">Your cart is empty</h4>;
    }
  };
  logHandler = () => {
    console.log(this);
  };
  render = () => {
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
          <Link className="link" to="/" onClick={this.logOutHandler}>
            LOG OUT
          </Link>
        </div>
        <ul>
          {this.props.cart.map((item, index) => {
            return (
              <div>
                <li className="itemsInCart">
                  <img src={item.thumbnailPath} />
                  <div>{item.name}</div>
                  <div>{item.price}</div>
                  <button
                    className="remove-item"
                    onClick={() => this.removeItemHandler(index)}
                  >
                    Remove item from cart
                  </button>
                </li>
              </div>
            );
          })}
        </ul>
        {this.isCartEmpty()}
        <h4 className="cart"> Your total will be: ${this.state.totalPrice} </h4>
        <div>
          <StripeCheckout
            className="stripe-el"
            token={this.onToken}
            stripeKey="pk_test_K08abbV1y863TnLbrmXVXYUE00IsV4DQF2"
          />
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { cart: state.cart };
};

let Cart = connect(mapStateToProps)(UnconnectedCart);

export default Cart;
