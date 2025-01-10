import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProductMock } from "../services/api"; // Import the mock function

const HomePage = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Use the mock data for now
        const productsData = await getProductMock();
        setProducts(productsData);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="home-page">
      <h1>Welcome to the E-Commerce Store</h1>
      <div className="product-list">
        {/* Check if products is an array and has items before calling map */}
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} productId={product.id} />
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
