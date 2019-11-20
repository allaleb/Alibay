import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UnconnectedCart extends Component {
  render = () => {
    return (
      <div>
        <ul>
          {this.props.cart.map(item => {
            return (
              <li className="itemsInCart">
                <img src={item.frontendPath} height="100px" />
                {item.name + " " + "$" + item.price}
              </li>
            );
          })}
        </ul>
        <button>Checkout</button>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { cart: state.cart };
};

let Cart = connect(mapStateToProps)(UnconnectedCart);

export default Cart;
