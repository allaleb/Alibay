import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";

class UnconnectedCart extends Component {
  removeItemHandler = index => {
    let copy = this.props.cart.slice();
    copy.splice(index, 1);
    console.log(copy);
    this.props.dispatch({
      type: "remove-item",
      cart: copy
    });
  };
  render = () => {
    return (
      <div>
        <div className="navbar-page">
          <div className="store-mini">
            <Link className="link" to="/">
              Jasallanda Sweet Market
            </Link>
          </div>
          <Link className="link" to="/marketplace">
            Marketplace
          </Link>
          <Link className="link" to="/myprofile">
            My Profile
          </Link>
          <Link className="link" to="/" onClick={this.logOutHandler}>
            Log Out
          </Link>
          <Link className="link" to="/">
            Home
          </Link>
        </div>
        <div>
          <StripeCheckout
            token={this.onToken}
            stripeKey="pk_test_K08abbV1y863TnLbrmXVXYUE00IsV4DQF2"
          />
          <ul>
            {this.props.cart.map((item, index) => {
              return (
                <div>
                  <li className="itemsInCart">
                    <img src={item.frontendPath} height="100px" />
                    {item.name + " " + "$" + item.price}
                    <button onClick={() => this.removeItemHandler(index)}>
                      Remove item from cart
                    </button>
                  </li>
                </div>
              );
            })}
          </ul>
          <button>Checkout</button>
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
