import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
      type: "login-success"
    });
  };

  render = () => {
    return (
      <div>
        <div className="navbar-page">
          <div className="store-mini">
            <Link className="link" to="/">
              Jasallanda Sweet Market
            </Link>
          </div>
          <Link className="link" to="/">
            HOME
          </Link>
        </div>
        <h1 className="store-name">Login</h1>
        <form className="form" onSubmit={this.handleSubmit}>
          <div>Username</div>
          <input type="text" onChange={this.handleUsernameChange} />
          <div>Password</div>
          <input type="text" onChange={this.handlePasswordChange} />
          <input type="submit" value="Login" />
        </form>
        <form className="form">
          <Link className="link" to="/signup">
            Create an account
          </Link>
        </form>
      </div>
    );
  };
}

let Login = connect()(UnconnectedLogin);

export default Login;
