import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UnconnectedCart extends Component {
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
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { cart: state.cart };
};

let Cart = connect(mapStateToProps)(UnconnectedCart);

export default Cart;
