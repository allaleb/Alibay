import React, { Component } from "react";
import { Link } from "react-router-dom";

class SearchResults extends Component {
  render() {
    return (
      <div>
        <Link to={"/itemdetails/" + this.props.searchResult._id}>
          <img src={this.props.searchResult.frontendPath} width="200px" />
        </Link>
        <div>{this.props.searchResult.name}</div>
        <div>{this.props.searchResult.price}</div>
      </div>
    );
  }
}
export default SearchResults;
