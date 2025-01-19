// src/components/BasePage.tsx

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BasePage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="container">
        {children}
      </div>
      <Footer />
    </>
  );
};

export default BasePage;
