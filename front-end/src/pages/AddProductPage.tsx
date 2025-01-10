import React, { useState } from 'react';
import { addProduct } from '../services/api'; // We'll implement this API call next

const AddProductPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!name || !description || !price) {
      alert('All fields are required');
      return;
    }
  
    const newProduct = { name, description, price: parseFloat(price) };
  
    try {
      const response = await addProduct(newProduct);
      console.log(response);  // Use the response for further logic if necessary
      alert('Product added successfully');
      setName('');
      setDescription('');
      setPrice('');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };
  

  return (
    <div>
      <h2>Add a New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductPage;
