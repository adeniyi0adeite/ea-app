import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Correct import for BrowserRouter
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import AddProductPage from './pages/AddProductPage';

const App = () => {
  return (
    <BrowserRouter basename="/ea-app"> {/* Use BrowserRouter correctly */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
