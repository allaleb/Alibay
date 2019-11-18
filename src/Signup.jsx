import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class UnconnectedSignup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
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

    this.props.dispatch({ type: "signup-success", loggedIn: true });
  };
  render = () => {
    return (
      <div>
        <Link to="/">Homepage</Link>
        <h1>Signup</h1>
        <form onSubmit={this.submitHandler}>
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
          <input type="submit" value="Sign up!"></input>
        </form>
      </div>
    );
  };
}
let mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  };
};
let Signup = connect(mapStateToProps)(UnconnectedSignup);
export default Signup;
