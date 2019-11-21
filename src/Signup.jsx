import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

class UnconnectedSignup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      signedUp: false
    };
  }
  usernameHandler = event => {
    this.setState({ username: event.target.value });
  };
  passwordHandler = event => {
    this.setState({ password: event.target.value });
  };
  submitHandler = async event => {
    event.preventDefault();
    let username = this.state.username;
    let password = this.state.password;
    let data = new FormData();
    data.append("username", username);
    data.append("password", password);
    let response = await fetch("/signup", { method: "POST", body: data });
    let body = await response.text();
    console.log("/signup response", body);
    body = JSON.parse(body);
    if (!body.success) {
      this.props.dispatch({ type: "unsuccessful", loggedIn: false });
      console.log("alert");
      alert("This username is already taken!");
      return;
    }
    alert("Sign up Successful, Please login");
    this.props.dispatch({ type: "signup-success", loggedIn: true });
    this.setState({ signedUp: true });
  };
  render = () => {
    if (this.state.signedUp === false) {
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
          <h1 className="store-name">Signup</h1>
          <form className="form" onSubmit={this.submitHandler}>
            Username
            <input
              type="text"
              value={this.state.username}
              onChange={this.usernameHandler}
            ></input>
            Password
            <input
              type="text"
              value={this.state.password}
              onChange={this.passwordHandler}
            ></input>
            <input type="submit" value="Sign up"></input>
          </form>
          <form className="form">
            <Link className="link" to="/login">
              Already have an account? Click here to log in
            </Link>
          </form>
        </div>
      );
    }
    return <Redirect to="/login" />;
  };
}
let mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  };
};
let Signup = connect(mapStateToProps)(UnconnectedSignup);

export default Signup;
