import React from "react";
import "./Table.css";
import { useProductContext } from "../../context/productContext";
import axios from "axios";
import { useState, useEffect } from "react";

const Table = () => {
  const { isLoading, products, deleteProduct } = useProductContext();
  // console.log("🚀 ~ file: Table.js:8 ~ Table ~ products", products);
  const [deletedId, setDeletedId] = useState();
  useEffect(() => {
    if (deletedId) {
      deleteProduct(deletedId);
    }
  }, [deletedId]);

  if (isLoading) {
    return <h1>loading...</h1>;
  }

  return (
    <div className="table-container">
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Status</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr index>
            <td>product_name</td>
            <td>category</td>
            <td>description</td>
            <td>status</td>
            <td>created</td>
            <td>
              <button className="edit-button">edit</button>
            </td>
            <td>
              <button className="delete-button">delete</button>
            </td>
          </tr> */}

          {products.map((products, index) => {
            return (
              <tr key={index}>
                <td>{products.product_name}</td>
                <td>{products.category_name}</td>
                <td>{products.description}</td>
                <td>{products.status}</td>
                <td>{products.created_date}</td>
                <td>
                  <button
                    className="edit-button"
                    // onClick={() => onEdit(products)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => setDeletedId(products.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
