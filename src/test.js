import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./ProductsTable.css";

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
      <table>
        <thead>
          <tr>
            {" "}
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
            <tr key={product.id}>
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
          ))}
        </tbody>
      </table>

      {/* Add product modal */}
      <Modal
        isOpen={newProductModalIsOpen}
        onRequestClose={closeNewProductModal}
      >
        <h2>Add Product</h2>
        <form>
          <label>
            Name:
            <input
              type="text"
              name="name"
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              name="category"
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            />
          </label>
          <label>
            Status:
            <input
              type="text"
              name="status"
              onChange={(e) =>
                setNewProduct({ ...newProduct, status: e.target.value })
              }
            />
          </label>
        </form>
        <button onClick={handleAdd}>Save</button>
        <button onClick={closeNewProductModal}>Cancel</button>
      </Modal>

      {/* Edit product modal */}
      <Modal isOpen={editProductModalIsOpen} onRequestClose={closeEditModal}>
        <h2>Edit Product</h2>
        <form>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={editedProduct.name}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, name: e.target.value })
              }
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              name="category"
              value={editedProduct.category}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, category: e.target.value })
              }
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={editedProduct.description}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  description: e.target.value,
                })
              }
            />
          </label>
          <label>
            Status:
            <input
              type="text"
              name="status"
              value={editedProduct.status}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, status: e.target.value })
              }
            />
          </label>
        </form>
        <button onClick={() => handleEdit(editedProduct.id)}>Save</button>
        <button onClick={closeEditModal}>Cancel</button>
      </Modal>
    </div>
  );
}

export default ProductsTable;

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
      onClick={() => handleDelete(eachData.id)}
    >
      delete
    </button>
  </td>
</tr>;
