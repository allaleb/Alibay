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
    console.log("body", body);
    this.setState({ items: body });
    let filteredItem = this.state.items.filter(item => {
      return item.seller === this.props.username;
    });
    this.setState({ filteredItem: filteredItem });
    let profileResponse = await fetch("/users");
    let profileBody = await profileResponse.text();
    profileBody = JSON.parse(profileBody);
    this.setState({ users: profileBody });
    let filteredUser = this.state.users.filter(user => {
      return user.username === this.state.filteredItem.seller;
    });
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
            <Link className="link" to="/">
              Jasallanda Sweet Market
            </Link>
          </div>
          <Link className="link" to="/marketplace">
            Marketplace
          </Link>
          <Link className="link" to="/" onClick={this.logOutHandler}>
            Log Out
          </Link>
          <Link className="link" to="/">
            Home
          </Link>
        </div>
        <h3>{"This profile page Belongs to: " + this.props.state.username}</h3>
        <div>{"About Me: " + this.state.filteredUser.bio}</div>
        <div>
          <h4>Upload own items</h4>
          <UploadItem />
        </div>
        <div>
          {this.state.filteredItem.map(item => {
            <div>
              <Link to={"/item/" + item._id}>
                <img src={item.thumbnailPath} height="100px" />
              </Link>
              <div>{item.description}</div>
              <div>{item.price}</div>
              <div>{item.name}</div>
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
