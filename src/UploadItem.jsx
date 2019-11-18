import React, { Component } from "react";
let multer = require("multer");
let upload = multer({ dest: __dirname + "/uploads/" });

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
    this.setState = { description: event.target.value };
  };

  priceChangeHandler = event => {
    this.setState = { price: event.target.value };
  };

  sellerChangeHandler = event => {
    this.setState = { seller: this.props.seller };
  };

  nameChangeHandler = event => {
    this.setState = { name: event.target.value };
  };

  fileChangeHandler = event => {
    this.setState = { file: event.target.files[0] };
  };

  submitHandler = evt => {
    evt.preventDefault();
    let data = new FormData();
    data.append("description", this.state.description);
    data.append("price", this.state.price);
    data.append("name", this.state.name);
    data.append("seller", this.state.seller);
    data.append("img", this.state.file);
    fetch("/upload-item", { method: "POST", body: data });
  };

  render = () => {
    return (
      <form onSubmit={this.submitHandler}>
        <input
          type="text"
          onChange={this.descChangeHandler}
          value="Description"
        ></input>
        <input
          type="text"
          onChange={this.priceChangeHandler}
          value="Price"
        ></input>
        <input type="file" onChange={this.fileChangeHandler} />
        <input
          type="text"
          onChange={this.nameChangeHandler}
          value="Item Name"
        ></input>
        <input type="submit" value="submit item"></input>
      </form>
    );
  };
}

export default UploadItem;
