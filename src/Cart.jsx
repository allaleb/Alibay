import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";


class UnconnectedCart extends Component {
  render = () => {
    return (
      <div>
        <button>Checkout</button>

        {/* <Link to="/">Homepage</Link>
        <h3>Your Cart</h3>
        <h4>Total</h4>
        <button>Checkout</button>
        <div className="navbar">
          <Link className="link" to="/">
            HOME
          </Link>
        </div> */}
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { cart: state.cart };
};

let Cart = connect(mapStateToProps)(UnconnectedCart);

export default Cart;
