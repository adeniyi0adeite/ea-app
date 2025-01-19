// src/pages/ProductDetailPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/api';

interface ProductDetail {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url?: string;
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProductDetail = async () => {
      if (id) {
        try {
          const response = await getProductById(Number(id));
          setProduct(response);
        } catch (error) {
          console.error('Error fetching product details', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProductDetail();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-detail-page">
      <h2>{product.name}</h2>
      <img src={product.image_url || '/default-product.jpg'} alt={product.name} />
      <div className="product-detail-info">
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <p>Stock: {product.stock}</p>
        <button className="btn btn-primary">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
