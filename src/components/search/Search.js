import React from "react";

const Search = ({ handleSearch }) => {
  return (
    <form className="form-inline">
      <input
        type="search"
        className="form-control form-search"
        placeholder="Search by name or category"
        onChange={handleSearch}
      />
      <button type="submit" className="btn btn-primary">
        Add Product
      </button>
    </form>
    // <div className="search-form">
    //   <input
    //     type="text"
    //     placeholder="Search by name or category"
    //     onChange={handleSearch}
    //   />
    //   <button className="add-product-button">Add Product</button>
    // </div>
  );
};

export default Search;
