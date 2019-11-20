import { connect } from "react-redux";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
class UnconnectedSearch extends Component {
  handleQuery = event => {
    this.props.dispatch({ type: "query", q: event.target.value });
  };
  handleMinimumPrice = event => {
    let price = parseInt(event.target.value);
    if (!isNaN(price)) {
      this.props.dispatch({ type: "minimum-price", price: event.target.value });
    }
  };
  handleMaximumPrice = event => {
    let price = parseInt(event.target.value);
    if (!isNaN(price)) {
      this.props.dispatch({ type: "maximum-price", price: event.target.value });
    }
  };
  handleInStock = event => {
    this.props.dispatch({ type: "show-in-stock" });
  };

  handleClearForm = event => {
    this.props.dispatch({ type: "clear-form" });
  };
  handleToggleAdvancedSearch = event => {
    this.props.dispatch({ type: "advanced-search" });
  };
  handleTags = event => {
    this.props.dispatch({ type: "find-tags", content: event.target.value });
  };

  advancedSearchHTML = () => {
    return (
      <div>
        <div>
          Minimum price
          <input
            type="text"
            onChange={this.handleMinimumPrice}
            value={this.props.minPrice}
          />
        </div>
        <div>
          Maximum price
          <input
            type="text"
            onChange={this.handleMaximumPrice}
            value={this.props.maxPrice}
          />
        </div>
        <div>
          In Stock
          <input
            type="checkbox"
            onChange={this.handleInStock}
            checked={this.props.showInStock}
          />
        </div>
      </div>
    );
  };
  render = () => {
    return (
      <div>
        <div>
          Search query
          <input
            type="text"
            onChange={this.handleQuery}
            value={this.props.query}
          />
        </div>
        <div>
          Search by tags!
          <input
            type="text"
            onChange={this.handleTags}
            value={this.props.findTags}
          />
        </div>
        <div>
          <div>
            <button onClick={this.handleClearForm}>Clear Form</button>
          </div>
          <div>
            <button onClick={this.handleToggleAdvancedSearch}>
              Toggle Advanced Search
            </button>
          </div>
          {this.props.advancedSearch ? this.advancedSearchHTML() : null}
        </div>
      </div>
    );
  };
}
let mapStateToProps = state => {
  return {
    query: state.searchQuery,
    minPrice: state.min,
    maxPrice: state.max,
    showInStock: state.showInStock,
    advancedSearch: state.advancedSearch,
    findTags: state.tags
  };
};
let Search = connect(mapStateToProps)(UnconnectedSearch);
export default Search;
