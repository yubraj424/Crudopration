import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./components/nopage/NoPage";
import Table from "./components/table/Table";
import "./App.css";

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
