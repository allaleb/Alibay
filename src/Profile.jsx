import React, { Component } from "react";
import { Link } from "react-router-dom";
import UploadItem from "./UploadItem.jsx";
import { connect } from "react-redux";

// import css
class UnconnectedProfile extends Component {
  componentDidMount = async () => {
    let response = await fetch("/all-items");
    let body = await response.text();
    body = JSON.parse(body);
    console.log("body", body);
    this.setState({ items: body });
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
          <Link className="link" to="/logout">
            <button onClick={this.logOutHandler}>Log Out</button>
          </Link>
          <Link className="link" to="/">
            HOME
          </Link>
        </div>
        {/* <div>{"This profile page Belongs to: " + this.props.profile.name}</div>
        <div>{"About Me: " + this.props.profile.aboutMe}</div> */}
        <div>
          <UploadItem />
        </div>
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
