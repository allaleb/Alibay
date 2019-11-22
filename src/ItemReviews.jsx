import React, { Component } from "react";

class ItemReviews extends Component {
  constructor() {
    super();
    this.state = {
      reviewer: "",
      itemBeingReviewed: "",
      review: "",
      itemReviews: [],
      filteredReviews: []
    };
  }
  componentDidMount = async () => {
    let response = await fetch("/all-reviews");
    let itemReviews = await response.text();
    console.log("itemReviews", itemReviews);
    itemReviews = JSON.parse(itemReviews);
    this.setState({ itemReviews: itemReviews });
    let filteredReviews = itemReviews.filter(itemReview => {
      return itemReview.reviewId === this.props.item._id;
    });
    this.setState({ filteredReviews: filteredReviews });
  };

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
      <div>
        <div>
          {this.state.filteredReviews.map(itemReview => {
            return (
              <div>
                <h4>{itemReview.reviewer}</h4>
                <div>{itemReview.review}</div>
              </div>
            );
          })}
        </div>
        <form onSubmit={this.submitHandler}>
          <input type="text" onChange={this.reviewChangeHandler}></input>
          <input type="submit"></input>
        </form>
      </div>
    );
  };
}

export default ItemReviews;
