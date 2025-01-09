import React from "react";
import { Link } from "react-router-dom";

type ProductCardProps = {
  productId: number;
};

const ProductCard: React.FC<ProductCardProps> = ({ productId }) => {
  return (
    <div className="product-card">
      <h3>Product {productId}</h3>
      <Link to={`/product/${productId}`}>View Details</Link>
    </div>
  );
};

export default ProductCard;
