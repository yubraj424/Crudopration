import React, { useState } from "react";

const Modal = (props) => {
  const [product, setProduct] = useState({});

  const handleChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (props.modalType === "add") {
      props.handleAdd(product);
    } else {
      props.handleEdit(props.currentProduct.id, product);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="product_name"
            value={product.product_name || ""}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={product.category || ""}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={product.description || ""}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Status:
          <input
            type="text"
            name="status"
            value={product.status || ""}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Save</button>
        <button onClick={() => props.setModalOpen(false)}>Cancel</button>
      </form>
    </div>
  );
};

export default Modal;
