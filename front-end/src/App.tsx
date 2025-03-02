import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import ProductPage from './pages/ProductPage';
import ProductUploadPage from './pages/ProductUploadPage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';

const App = () => {
  return (
    <BrowserRouter basename="/ea-app">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/upload-product" element={<ProductUploadPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order" element={<OrderPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;