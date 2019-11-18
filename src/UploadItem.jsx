import React, { Component } from "react";

class UploadItem extends Component {
  constructor() {
    super();
    this.state = {
      description: "",
      price: "",
      name: "",
      file: ""
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
    data.append("seller", this.state.seller);
    data.append("img", this.state.file);
    let response = await fetch("/upload-item", { method: "POST", body: data });
    let body = await response.json();
    console.log("body", body);
  };

  render = () => {
    return (
      <form onSubmit={this.submitHandler}>
        <input
          type="text"
          onChange={this.nameChangeHandler}
          placeholder="Item Name"
        ></input>
        <input
          type="text"
          onChange={this.descChangeHandler}
          placeholder="Item Description"
        ></input>
        <input
          type="text"
          onChange={this.priceChangeHandler}
          placeholder="Price"
        ></input>
        <input type="file" onChange={this.fileChangeHandler} />
        <input type="submit" value="submit item"></input>
      </form>
    );
  };
}

export default UploadItem;
