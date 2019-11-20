import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
  };

  render = () => {
    return (
      <div>
        <div className="navbar-home">
          <Link className="link" to="/profile">
            PROFILE
          </Link>
          <Link className="link" to="/cart">
            CART
          </Link>
        </div>
        <h1 className="store-name">Jasallanda Sweet Market</h1>
        <div className="market-wrapper">
          <Link className="market-link" to="/marketplace">
            MARKETPLACE
          </Link>
          <Link className="market-link" to="/signup">
            SIGN UP
          </Link>
          <Link className="market-link" to="/login">
            LOG IN
          </Link>
        </div>
        {/* <div className="feature">
           {this.props.items.map(item => {
           return <FeaturedItem item={item} />;
         })}
        </div> */}
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { items: state.items };
};

let Homepage = connect(mapStateToProps)(UnconnectedHomepage);

export default Homepage;
