import React from "react";

const ProductRow = ({ product, openEditModal, handleDelete }) => {
  return (
    <tr>
      <th scope="row">{product.id}</th>
      <td>{product.product_name}</td>
      <td>{product.category_name}</td>
      <td>{product.description}</td>
      <td>{product.created_at}</td>
      <td>{product.status}</td>
      <td>
        <button
          className="btn btn-success"
          onClick={() => openEditModal(product)}
        >
          Edit
        </button>
        <button
          className=" btn btn-danger"
          onClick={() => handleDelete(product.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ProductRow;
