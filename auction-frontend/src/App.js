import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import AddProduct from './AddProduct'; // ✅ thêm dòng này

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/add-product" element={<AddProduct />} /> {/* ✅ thêm dòng này */}
      </Routes>
    </Router>
  );
}

export default App;
