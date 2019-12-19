import React, { Component } from "react";
import { Link } from "react-router-dom";
import UploadItem from "./UploadItem.jsx";
import { connect } from "react-redux";

class UnconnectedMyProfile extends Component {
  constructor() {
    super();
    this.state = {
      filteredItem: [],
      items: [],
      users: [],
      filteredUser: []
    };
  }
  componentDidMount = async () => {
    let response = await fetch("/all-items");
    let body = await response.text();
    body = JSON.parse(body);
    this.setState({ items: body });
    let filteredItem = this.state.items.filter(item => {
      return item.seller === this.props.username;
    });
    this.setState({ filteredItem: filteredItem });
    console.log("filteredItem", filteredItem);
    let profileResponse = await fetch("/users");
    let profileBody = await profileResponse.text();
    profileBody = JSON.parse(profileBody);
    this.setState({ users: profileBody });
    console.log("users", this.state.users);
    let filteredUser = this.state.users.filter(user => {
      return user.username === this.props.username;
    });
    console.log("filteredUser", filteredUser);
    this.setState({ filteredUser: filteredUser });
  };
  logOutHandler = () => {
    this.props.dispatch({ type: "log-out" });
  };
  render() {
    return (
      <div>
        <div className="navbar-page">
          <div className="store-mini">
            <Link className="link-store" to="/">
              Jasallanda Sweet Market
            </Link>
          </div>
          <Link className="link" to="/marketplace">
            MARKETPLACE
          </Link>
          <Link className="link" to="/cart">
            CART
          </Link>
          <Link className="link" to="/" onClick={this.logOutHandler}>
            LOG OUT
          </Link>
        </div>
        <h3 className="feature-profile">
          {"This profile page belongs to: " + this.props.state.username}
        </h3>
        <h4 className="feature-me">
          {this.state.filteredUser.map(user => {
            return <div className="feature-price">{user.bio}</div>;
          })}
        </h4>
        <div>
          <h4 className="feature-upload">Upload items to sell</h4>
          <UploadItem />
        </div>
        <div>
          {this.state.filteredItem.map(item => {
           ccccc
              <label className="search-bar">
                <div>
                  <div>{item.description}</div>
                  <div>{item.price}</div>
                  <div>{item.name}</div>
                </div>
              </label>
            </div>;
          })}
        </div>
      </div>
    );
  }
}
let mapStateToProps = state => {
  return { username: state.username, state };
};
let MyProfile = connect(mapStateToProps)(UnconnectedMyProfile);
export default MyProfile;
