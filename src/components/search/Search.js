import React from "react";
import "./Search.css";

import { BiSearch } from "react-icons/bi";

const Search = (props) => {
  return (
    <form action="">
      <input
        type="text"
        placeholder="search.."
        required
        value={props.searchTerm}
        onChange={(event) => props.setSearchTerm(event.target.value)}
      />
      <button className="fa " onClick={props.handleSearch}>
        <BiSearch className="fa" />
      </button>
    </form>
  );
};

export default Search;
