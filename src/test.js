import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Form, Button, Modal } from "react-bootstrap";

function App() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    status: "",
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://api.example.com/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleInputChange = (event) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddProduct = (event) => {
    event.preventDefault();
    axios
      .post("http://api.example.com/products", product)
      .then((res) => {
        setProducts([...products, res.data]);
        setShowModal(false);
      })
      .catch((err) => console.error(err));
  };

  const handleEditProduct = (product) => {
    setProduct(product);
    setShowModal(true);
  };

  const handleUpdateProduct = (event) => {
    event.preventDefault();
    axios
      .put(`http://api.example.com/products/${product.id}`, product)
      .then((res) => {
        const updatedProducts = products.map((item) =>
          item.id === product.id ? res.data : item
        );
        setProducts(updatedProducts);
        setShowModal(false);
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteProduct = (product) => {
    axios
      .delete(`http://api.example.com/products/${product.id}`)
      .then((res) => {
        setProducts(products.filter((item) => item.id !== product.id));
      })
      .catch((err) => console.error(err));
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1>Product Manager</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Status</th>
            <th>Created</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.description}</td>
              <td>{product.status}</td>
              <td>{product.created}</td>
              <td>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleEditProduct(product)}
                >
                  Edit
                </Button>
              </td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteProduct(product)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add Product
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {product.id ? "Edit Product" : "Add Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={product.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={product.category}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                name="description"
                value={product.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={product.status}
                onChange={handleInputChange}
              >
                <option>Active</option>
                <option>Inactive</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          {product.id ? (
            <Button variant="primary" onClick={handleUpdateProduct}>
              Save Changes
            </Button>
          ) : (
            <Button variant="primary" onClick={handleAddProduct}>
              Add Product
            </Button>
          )}
        </Modal.Footer>
      </Modal>
      <Form className="mt-4">
        <Form.Group controlId="formSearch">
          <Form.Control
            type="text"
            placeholder="Search by name or category..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </Form.Group>
      </Form>
    </div>
  );
}

export default App;

// ----------------------------------------------------------------------------------------------------------------------------------------

// // Table.js
// import React from 'react';
// import { Table, Button } from 'react-bootstrap';

// const Table = ({ products, handleEditProduct, handleDeleteProduct }) => (
//   <Table striped bordered hover>
//     <thead>
//       <tr>
//         <th>Name</th>
//         <th>Category</th>
//         <th>Description</th>
//         <th>Status</th>
//         <th>Created</th>
//         <th></th>
//         <th></th>
//       </tr>
//     </thead>
//     <tbody>
//       {products.map(product => (
//         <tr key={product.id}>
//           <td>{product.name}</td>
//           <td>{product.category}</td>
//           <td>{product.description}</td>
//           <td>{product.status}</td>
//           <td>{product.created}</td>
//           <td>
//             <Button
//               variant="secondary"
//               size="sm"
//               onClick={() => handleEditProduct(product)}
//             >
//               Edit
//             </Button>
//           </td>
//           <td>
//             <Button
//               variant="danger"
//               size="sm"
