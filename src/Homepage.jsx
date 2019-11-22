import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FeaturedItem from "./FeaturedItems.jsx";

class UnconnectedHomepage extends Component {
  constructor() {
    super();
    this.state = {
      featured: []
    };
  }

  componentDidMount = async () => {
    let response = await fetch("/all-items");
    let items = await response.text();
    items = JSON.parse(items);
    console.log("items", items);
    this.props.dispatch({ type: "set-items", items: items });
    let chosenIndexes = [];
    let featuredItems = [];
    for (let i = 0; i < 3; i++) {
      let added = false;
      let index = Math.floor(Math.random() * Math.floor(items.length));
      if (!chosenIndexes.includes(index)) {
        featuredItems.push(items[index]);
        chosenIndexes.push(index);
        added = true;
      }
      if (!added) {
        i--;
      }
    }
    console.log("featuredItems", featuredItems);
    console.log(this);
    this.setState({ featured: featuredItems });
  };

  logOutHandler = () => {
    this.props.dispatch({ type: "log-out" });
  };

  render = () => {
    if (this.props.loggedIn === true)
      return (
        <div>
          <div className="navbar-home">
            <Link className="link" to="/" onClick={this.logOutHandler}>
              Log Out
            </Link>
            <Link className="link" to="/myprofile">
              My Profile
            </Link>
            <Link classname="link" to="/" onClick={this.logoutHandler} />
            <Link className="link" to="/cart">
              CART
            </Link>
          </div>
          <h1 className="store-name">Jasallanda Sweet Market</h1>
          <div className="market-wrapper">
            <Link className="market-link" to="/marketplace">
              MARKETPLACE
            </Link>
          </div>
          <div className="feature-title">Featured Items</div>
          <div className="feature">
            {this.state.featured.map(item => {
              return <FeaturedItem item={item} />;
            })}
          </div>
        </div>
      );
    return (
      <div>
        <div className="navbar-home"></div>
        <h1 className="store-name">Jasallanda Sweet Market</h1>
        <div className="market-wrapper">
          <Link
            className="market-link"
            onClick={this.onClickHandler}
            to="/login"
          >
            MARKETPLACE
          </Link>
          <Link className="market-link" to="/signup">
            SIGN UP
          </Link>
          <Link className="market-link" to="/login">
            LOG IN
          </Link>
        </div>
        <div className="feature-title">Featured Items</div>
        <div className="feature">
          {this.state.featured.map(item => {
            return <FeaturedItem item={item} />;
          })}
        </div>
      </div>
    );
  };
}
let mapStateToProps = state => {
  return { items: state.items, loggedIn: state.loggedIn };
};

let Homepage = connect(mapStateToProps)(UnconnectedHomepage);

export default Homepage;
