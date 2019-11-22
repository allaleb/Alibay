import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class UnconnectedProfile extends Component {
  constructor() {
    super();
    this.state = {
      filteredItems: [],
      items: [],
      users: [],
      filteredUser: [],
      seller: ""
    };
  }
  componentDidMount = async () => {
    let response = await fetch("/all-items");
    let body = await response.text();
    body = JSON.parse(body);
    console.log("body", body);
    this.setState({ items: body });
    console.log(this.state.items);
    let filteredItems = this.state.items.filter(item => {
      return item.seller === this.props.seller;
    });
    this.setState({ filteredItems: filteredItems });
    console.log(this.state);
    let profileResponse = await fetch("/users");
    let profileBody = await profileResponse.text();
    profileBody = JSON.parse(profileBody);
    this.setState({ users: profileBody });
    console.log(this.state.users);
    let filtUser = this.state.filteredItems.find(item => {
      return item.seller === this.props.seller;
    });
    console.log("filtUser", filtUser);
    let filteredUser = this.state.users.filter(user => {
      return user.username === filtUser.seller;
    });
    this.setState({ filteredUser: filteredUser });
    console.log("filteredUser", filteredUser);
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
        <h3>{"Profile for: " + this.props.seller}</h3>
        <div>About this seller:</div>
        <div>
          {this.state.filteredUser.map(user => {
            return (
              <div>
                <div>{user.bio}</div>
              </div>
            );
          })}
        </div>
        <div>{"Other items for sale from " + this.props.seller}</div>
        <div>
          {this.state.filteredItems.map(item => {
            return (
              <div>
                <div>{item.description}</div>
                <div>{item.price}</div>
                <div>{item.name}</div>
                <Link to={"/itemdetails/" + item._id}>
                  <img src={item.thumbnailPath} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
let mapStateToProps = state => {
  return { username: state.username, seller: state.seller };
};
let Profile = connect(mapStateToProps)(UnconnectedProfile);
export default Profile;
