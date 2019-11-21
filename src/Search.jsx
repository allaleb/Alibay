import { connect } from "react-redux";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import SearchResults from "./SearchResults.jsx";

class UnconnectedSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      results: {},
      loading: false,
      searchResults: []
    };
  }

  // handleClearForm = event => {
  //   this.props.dispatch({ type: "clear-form" });
  // };

  // submitHandler = event => {
  //   event.preventDefault();
  //   let data = new FormData();
  //   // data.append("query", this.props.state.query);
  //   fetch("/search", { method: "POST", body: data });
  // };

  // advancedSearchHTML = () => {
  //   return (
  //     <div>
  //       <div>
  //         Minimum price
  //         <input
  //           type="text"
  //           onChange={this.handleMinimumPrice}
  //           value={this.props.minPrice}
  //         />
  //       </div>
  //       <div>
  //         Maximum price
  //         <input
  //           type="text"
  //           onChange={this.handleMaximumPrice}
  //           value={this.props.maxPrice}
  //         />
  //       </div>
  //       <div>
  //         In Stock
  //         <input
  //           type="checkbox"
  //           onChange={this.handleInStock}
  //           checked={this.props.showInStock}
  //         />
  //       </div>
  //     </div>
  //   );
  // };

  handleOnInputChange = event => {
    let query = event.target.value;
    this.setState({ query: query });
  };

  handleSubmit = async () => {
    event.preventDefault();
    let data = new FormData();
    data.append("searchTerm", this.state.query);
    fetch("/search", { method: "POST", body: data });
    let response = await fetch("/search", { method: "POST", body: data });
    let searchResults = await response.text();
    searchResults = JSON.parse(searchResults);
    this.setState({ searchResults: searchResults });
  };

  // {this.props.items.map(item => {
  //   return <DisplayItem item={item} />;

  // var newArray = array.filter(function(item) {
  //   return condition;
  // });
  // const result = words.filter(word => word.length > 6);

  // componentDidMount = async () => {
  //   let response = await fetch("/all-items");
  //   let items = await response.text();
  //   items = JSON.parse(items);
  //   console.log(this);
  //   this.props.dispatch({ type: "set-items", items: items });
  // };
  // logOutHandler = () => {
  //   this.props.dispatch({ type: "log-out" });
  // };

  render = () => {
    return (
      <div className="container">
        <h2 className="heading">Search items</h2>
        <label className="search-label" htmlFor="search-input">
          <input
            type="text"
            name="query"
            value={this.state.query}
            id="search-input"
            placeholder="Search"
            onChange={this.handleOnInputChange}
          />
          <div>
            {this.state.searchResults.map(searchResult => {
              return <SearchResults searchResult={searchResult} />;
            })}
          </div>
          <button onClick={this.handleSubmit}>Search</button>
        </label>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    query: state.searchQuery
  };
};
let Search = connect(mapStateToProps)(UnconnectedSearch);
export default Search;
