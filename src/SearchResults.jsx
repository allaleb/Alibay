import React, { Component } from "react";
import { Link } from "react-router-dom";

class SearchResults extends Component {
  render() {
    return (
      <div>
        <Link to={"/itemdetails/" + this.props.searchResult._id}>
          <img src={this.props.searchResult.thumbnailPath} />
        </Link>
        <div classnName="feature-name">{this.props.searchResult.name}</div>
        <div className="feature-price">{this.props.searchResult.price}</div>
      </div>
    );
  }
}
export default SearchResults;
