import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./NoPage";
import "./App.css";
import Home from "./Home";
import Products from "./Products";
import AddProductForm from "./components/add/AddProductForm";

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/add" element={<AddProductForm />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
