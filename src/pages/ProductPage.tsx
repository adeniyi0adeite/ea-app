import React from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>Product Details for {id}</h1>
      {/* Fetch and display product details based on `id` */}
    </div>
  );
};

export default ProductPage;
