import { connect } from "react-redux";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import SearchResults from "./SearchResults.jsx";
import DisplayItem from "./DisplayItem.jsx";

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

  handleDelete = event => {
    let query = event.target.value;
    this.setState({ query: "" });
  };

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

  render = () => {
    return (
      <div className="container">
        <label className="search-label" htmlFor="search-input">
          <div className="">
            <div className="search-bar">
              <input
                type="text"
                name="query"
                value={this.state.query}
                id="search-input"
                placeholder="Find something sweet to eat..."
                onChange={this.handleOnInputChange}
              />
              <button className="buttonSearch" onClick={this.handleSubmit}>
                SEARCH
              </button>
              <button className="buttonDelete" onClick={this.handleDelete}>
                DELETE
              </button>
            </div>
            <div></div>
            {this.state.searchResults.map(item => {
              return <DisplayItem item={item} />;
            })}
          </div>
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
