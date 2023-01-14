import React from "react";
import AddProductForm from "./components/add/AddProductForm";
import Search from "./components/search/Search";
import Table from "./components/table/Table";
import { NavLink } from "react-router-dom";
import "./home.css";
const Home = () => {
  return (
    <>
      <div>hello this is CRUD OPERATION WEBSITE</div>;
      <NavLink to="/add">
        <button className="button">add product</button>
      </NavLink>
      <Search />
      <Table />
    </>
  );
};

export default Home;
