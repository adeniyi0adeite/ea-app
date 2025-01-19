// src/pages/HomePage.tsx

import React from 'react';
import BasePage from './BasePage';
import { Link } from 'react-router-dom';


const HomePage = () => {
  return (
    <BasePage>
      <div className="text-center mt-5">
        <h1>Welcome to E-Shop</h1>
        <p>Your one-stop shop for the best products.</p>
        <Link to="/products" className="btn btn-primary mt-3">Shop Now</Link>
      </div>
    </BasePage>
  );
};

export default HomePage;
