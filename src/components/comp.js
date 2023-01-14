import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductsTable.css";
import Modal from "react-modal";
// ProductsTable component
function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newProductModalIsOpen, setNewProductModalIsOpen] = useState(false);
  const [editProductModalIsOpen, setEditProductModalIsOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    id: null,
    name: "",
    category: "",
    description: "",
    status: "",
  });

  useEffect(() => {
    axios.get("api/products").then((res) => setProducts(res.data));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`api/products/${id}`).then((res) => {
      const newProducts = products.filter((product) => product.id !== id);
      setProducts(newProducts);
    });
  };

  const openEditModal = (product) => {
    setEditedProduct({ ...product });
    setEditProductModalIsOpen(true);
  };

  const closeEditModal = () => {
    setEditProductModalIsOpen(false);
  };

  const handleEdit = (id) => {
    axios.put(`api/products/${id}`, editedProduct).then((res) => {
      const newProducts = products.map((product) => {
        if (product.id === id) {
          return { ...editedProduct };
        } else {
          return product;
        }
      });
      setProducts(newProducts);
      closeEditModal();
    });
  };

  const openNewProductModal = () => {
    setNewProductModalIsOpen(true);
  };

  const closeNewProductModal = () => {
    setNewProductModalIsOpen(false);
  };

  const handleAdd = (newProduct) => {
    axios.post("api/products", newProduct).then((res) => {
      setProducts([...products, res.data]);
      closeNewProductModal();
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <SearchForm
        handleSearch={handleSearch}
        openNewProductModal={openNewProductModal}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
              openEditModal={openEditModal}
              handleDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={newProductModalIsOpen}
        onRequestClose={closeNewProductModal}
      >
        <AddProductForm
          handleAdd={handleAdd}
          closeModal={closeNewProductModal}
        />
      </Modal>
      <Modal isOpen={editProductModalIsOpen} onRequestClose={closeEditModal}>
        <EditProductForm
          product={editedProduct}
          handleEdit={handleEdit}
          closeModal={closeEditModal}
        />
      </Modal>
    </div>
  );
}
// SearchForm component
const SearchForm = ({ handleSearch, openNewProductModal }) => (
  <div className="search-form">
    <input
      type="text"
      placeholder="Search by name or category"
      onChange={handleSearch}
    />
    <button className="add-product-button" onClick={openNewProductModal}>
      Add Product
    </button>
  </div>
);
// ProductRow component
const ProductRow = ({ product, openEditModal, handleDelete }) => (
  <tr>
    <td>{product.name}</td>
    <td>{product.category}</td>
    <td>{product.description}</td>
    <td>{product.status}</td>
    <td>{product.created_at}</td>
    <td>
      <button onClick={() => openEditModal(product)}>Edit</button>
      <button onClick={() => handleDelete(product.id)}>Delete</button>
    </td>
  </tr>
);
// AddProductForm component
const AddProductForm = ({ handleAdd, closeModal }) => {
  // form state and handle functions
  return (
    <form onSubmit={handleSubmit}>
      {/ form inputs /}
      <button type="submit">Add Product</button>
      <button onClick={closeModal}>Cancel</button>
    </form>
  );
};

// EditProductForm component
const EditProductForm = ({ product, handleEdit, closeModal }) => {
  // form state and handle functions
  return (
    <form onSubmit={handleSubmit}>
      {/ form inputs /}
      <button type="submit">Save Changes</button>
      <button onClick={closeModal}>Cancel</button>
    </form>
  );
};

export default ProductsTable;
