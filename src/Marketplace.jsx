import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import DisplayItem from "./DisplayItem.jsx";
import Search from "./Search.jsx";

class UnconnectedMarketplace extends Component {
  componentDidMount = async () => {
    let response = await fetch("/all-items");
    let items = await response.text();
    items = JSON.parse(items);
    console.log(this);
    this.props.dispatch({ type: "set-items", items: items });
  };
  logOutHandler = () => {
    this.props.dispatch({ type: "log-out" });
  };
  render() {
    return (
      <div>
        <div className="navbar-page">
          <div className="store-mini">
            <Link className="link" to="/">
              Jasallanda Sweet Market
            </Link>
          </div>
          <Link className="link" to="/cart">
            CART
          </Link>
          <Link className="link" to="/" onClick={this.logOutHandler}>
            Log Out
          </Link>
          <Link className="link" to={"/profile/" + this.props.username}>
            Profile
          </Link>
          <Link className="link" to="/">
            HOME
          </Link>
        </div>
        <Search />
        <div className="marketplace">
          {this.props.items.map(item => {
            return <DisplayItem item={item} />;
          })}
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return { items: state.items, username: state.username };
};

let Marketplace = connect(mapStateToProps)(UnconnectedMarketplace);

export default Marketplace;
