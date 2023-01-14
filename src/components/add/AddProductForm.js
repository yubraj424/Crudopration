import React, { useState } from "react";
import axios from "axios";
import "./Add.css";
import { NavLink } from "react-router-dom";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    product_name: "",
    category_name: "",
    description: "",
    status: "",
    created_date: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // const headers = { "Content-Type": "application/json" };
      await axios.post("https://product-fhqo.onrender.com/products", formData, {
        headers: { "Content-Type": "application/json" },
      });
      setSuccess(true);
      setError(false);
    } catch (err) {
      console.error(err);
      setSuccess(false);
      setError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <label className="label">
        Product Name:
        <input
          type="text"
          name="product_name"
          value={formData.product_name}
          onChange={handleChange}
          required
          className="input[type='text']"
        />
      </label>
      <br />
      <label>
        Category:
        <input
          type="text"
          name="category_name"
          value={formData.category_name}
          onChange={handleChange}
          required
          className="input[type='text']"
        />
      </label>
      <br />
      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="textarea"
        />
      </label>
      <br />
      <label>
        Status:
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
          className="select"
        >
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
      </label>
      <br />
      <label>
        Created Date:
        <input
          type="date"
          name="created_date"
          value={formData.created_date}
          onChange={handleChange}
          required
          className="input[type='date']"
        />
      </label>
      <br />

      <button type="submit" className="button">
        submit
      </button>

      {success && <p style={{ color: "green" }}>Product added successfully!</p>}
      {error && (
        <p style={{ color: "red" }}>An error occurred. Please try again.</p>
      )}

      <NavLink to="/">
        <button className="button">go back</button>
      </NavLink>
    </form>
  );
};

export default AddProductForm;
