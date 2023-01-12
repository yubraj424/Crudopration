import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Search from "../search/Search";

const Table = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // const getData = () => {
  //   axios
  //     .get("https://product-fhqo.onrender.com/products")
  //     .then((res) => {
  //       console.log(res);
  //       setData(res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       // ...
  //     });
  // };

  // const handleDelete = (id) => {
  //   axios
  //     .delete(`https://product-fhqo.onrender.com/products/${id}`)
  //     .then(() => {
  //       getData();
  //     });
  // };
  // useEffect(() => {
  //   getData();
  // }, []);

  useEffect(() => {
    axios.get("https://product-fhqo.onrender.com/products").then((res) => {
      console.log("🚀 ~ file: Table.js:38 ~ useEffect ~ res", res);
      return setData(res.data);
    });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <Search handleSearch={handleSearch} />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Description</th>
            <th scope="col">Created At</th>
            <th scope="col">status</th>
            <th scope="col">edit</th>
            <th scope="col">delete</th>
          </tr>
        </thead>
        {data.products &&
          data.products.length > 0 &&
          data.products.map((eachData) => {
            return (
              <>
                <tbody>
                  <tr>
                    <th scope="row">{eachData.id}</th>
                    <td>{eachData.product_name}</td>
                    <td>{eachData.category_name}</td>
                    <td>{eachData.description}</td>
                    <td>{eachData.created_at}</td>
                    <td>{eachData.status}</td>
                    <td>
                      <button className="btn btn-success">edit</button>
                    </td>
                    <td>
                      <button
                        className=" btn btn-danger"
                        // onClick={() => handleDelete(eachData.id)}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </>
            );
          })}
      </table>
    </>
  );
};

export default Table;
