import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// import css
class UnconnectedProfile extends Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
  }
  componentDidMount = async () => {
    let response = await fetch("/all-items");
    let body = await response.text();
    body = JSON.parse(body);
    console.log("body", body);
    this.setState({ items: body });
    console.log(this);
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
          <Link className="link" to="/marketplace">
            Marketplace
          </Link>
          <Link className="link" to="/cart">
            CART
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
        <h3>{"This profile page Belongs to: " + this.props.sellerUsername}</h3>
        {/* <div>{"About Me: " + this.props.state.aboutMe}</div>  */}
        {/* <div>
          {this.props.items.map(item => {
            <div>
              <div>hello world</div>
              <div>{item.description}</div>
              <div>{item.price}</div>
              <div>{item.name}</div>
              <Link to={"/item/" + item._id}>
                <img src={item.frontendPath} height="100px" />
              </Link>
            </div>;
          })}
        </div> */}
      </div>
    );
  }
}
let mapStateToProps = state => {
  return { username: state.username, state };
};
let Profile = connect(mapStateToProps)(UnconnectedProfile);
export default Profile;
