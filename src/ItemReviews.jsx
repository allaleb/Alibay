import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedItemReviews extends Component {
  constructor() {
    super();
    this.state = {
      reviewer: "",
      itemBeingReviewed: "",
      review: ""
    };
  }
  reviewChangeHandler = event => {
    this.setState({ review: event.target.value });
  };
  submitHandler = async event => {
    event.preventDefault();
    let data = new FormData();
    data.append("review", this.state.review);
    data.append("reviewer", this.state.reviewer);
    data.append("item", this.state.itemBeingReviewed);
    data.append("itemId", this.props.item._id);
    let response = await fetch("/upload-review", {
      method: "POST",
      body: data
    });
    let body = await response.text();
    body = JSON.parse(body);
  };

  render = () => {
    return (
      <form onSubmit={this.submitHandler}>
        <input type="text" onChange={this.reviewChangeHandler}></input>
      </form>
    );
  };
}

export default ItemReviews;
