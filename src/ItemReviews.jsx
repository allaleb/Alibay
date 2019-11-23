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
                <ul>
                  {/* <h4>{itemReview.reviewer}</h4> */}
                  <li className="feature-price">{itemReview.review}</li>
                </ul>
              </div>
            );
          })}
        </div>
        <form onSubmit={this.submitHandler}>
          <input
            type="text"
            onChange={this.reviewChangeHandler}
            className="review-input"
            placeholder="  Submit a review for this item..."
          ></input>
          <div className="space"></div>
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    );
  };
}

export default ItemReviews;
