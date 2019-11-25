import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedUploadItem extends Component {
  constructor() {
    super();
    this.state = {
      description: "",
      price: "",
      name: "",
      file: "",
      username: ""
    };
  }

  descChangeHandler = event => {
    this.setState({ description: event.target.value });
  };

  priceChangeHandler = event => {
    this.setState({ price: event.target.value });
  };

  // sellerChangeHandler = event => {
  //   this.setState({ seller: this.props.seller });
  // };

  nameChangeHandler = event => {
    this.setState({ name: event.target.value });
  };

  fileChangeHandler = event => {
    console.log("test");
    this.setState({ file: event.target.files[0] });
  };

  submitHandler = async event => {
    console.log("new item submitted");
    event.preventDefault();
    let data = new FormData();
    data.append("description", this.state.description);
    data.append("price", this.state.price);
    data.append("name", this.state.name);
    data.append("seller", this.props.username);
    data.append("img", this.state.file);
    let response = await fetch("/upload-item", { method: "POST", body: data });
    let body = await response.text();
    console.log("body", body);
  };

  render = () => {
    return (
      <form className="forms" onSubmit={this.submitHandler}>
        <input
          className="test"
          type="text"
          onChange={this.nameChangeHandler}
          placeholder=" Item Name"
        ></input>
        <div></div>
        <input
          className="test"
          type="text"
          onChange={this.descChangeHandler}
          placeholder=" Item Description"
        ></input>
        <div></div>
        <input
          className="test"
          type="text"
          onChange={this.priceChangeHandler}
          placeholder=" Price"
        ></input>
        <div className="space"></div>
        <input type="file" onChange={this.fileChangeHandler} />
        <div></div>
        <input type="submit" value="Submit"></input>
      </form>
    );
  };
}
let mapStateToProps = state => {
  return { username: state.username };
};

let UploadItem = connect(mapStateToProps)(UnconnectedUploadItem);

export default UploadItem;
