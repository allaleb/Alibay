import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import DisplayItem from "./DisplayItem.jsx";

class UnconnectedMarketplace extends Component {
  componentDidMount = async () => {
    let response = await fetch("/all-items");
    let items = await response.text();
    items = JSON.parse(items);
    console.log("items", items);
    this.props.dispatch({ type: "set-items", items: items });
  };

  render() {
    return (
      <div>
        <div className="navbar-page">
          <div className="store-mini">Jasallanda Sweet Market</div>
          <Link className="link" to="/">
            HOME
          </Link>
        </div>
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
  return { items: state.items };
};

let Marketplace = connect(mapStateToProps)(UnconnectedMarketplace);

export default Marketplace;
