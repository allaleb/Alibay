import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

class UnconnectedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleUsernameChange = event => {
    console.log("new username", event.target.value);
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = event => {
    console.log("new password", event.target.value);
    this.setState({ password: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    console.log("login from submitted");
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    let response = await fetch("/login", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    console.log("responseBody from login", responseBody);
    let body = JSON.parse(responseBody);
    console.log("parsed body", body);
    if (!body.success) {
      alert("Login failed! Try again!");
      return;
    }
    alert("Login successful!");
    this.props.dispatch({
      type: "login-success",
      username: this.state.username
    });
  };

  render = () => {
    if (this.props.loggedIn === false) {
      return (
        <div>
          <div className="navbar-page">
            <div className="store-mini">
              <Link className="link-store" to="/">
                Jasallanda Sweet Market
              </Link>
            </div>
          </div>
          <h1 className="login-name">Login </h1>
          <form className="login-form" onSubmit={this.handleSubmit}>
            <div>Username</div>
            <input type="text" onChange={this.handleUsernameChange} />
            <br></br>
            <div>Password</div>
            <input type="password" onChange={this.handlePasswordChange} />
            <input type="submit" value="Login" />
          </form>
          <form className="form">
            <div className="link-login">
              <Link className="link" to="/signup">
                Not a member? Click here to create an account
              </Link>
            </div>
          </form>
        </div>
      );
    }
    return <Redirect to="/marketplace" />;
  };
}
let mapStateToProps = state => {
  return { loggedIn: state.loggedIn };
};
let Login = connect(mapStateToProps)(UnconnectedLogin);

export default Login;
