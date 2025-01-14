import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../services/api';

const CartPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Fetch all products once component is mounted
    const fetchProducts = async () => {
      try {
        const products = await getAllProducts();
        setProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Function to add an item to the cart
  const addToCart = (product: any) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      // If item is already in cart, increase the quantity by 1
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      // If item is not in cart, add it with an initial quantity of 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Function to increase the quantity of an item
  const increaseQuantity = (productId: number) => {
    setCart(cart.map(item => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item));
  };

  // Function to decrease the quantity of an item but ensure it doesn't go below 1
  const decreaseQuantity = (productId: number) => {
    setCart(cart.map(item => {
      if (item.id === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    }));
  };

  // Function to remove an item from the cart
  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // Recalculate the total price whenever the cart changes
  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
    setTotalPrice(total);
  }, [cart]); // The total price recalculates whenever cart changes

  return (
    <div>
      <h1>Shopping Cart</h1>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${Number(product.price).toFixed(2)}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <h2>Selected Items</h2>
      {cart.length > 0 ? (
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <h3>{item.name}</h3>
              <p>${Number(item.price).toFixed(2)}</p>
              <div className="quantity-controls">
                <button onClick={() => decreaseQuantity(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQuantity(item.id)}>+</button>
              </div>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
          <button onClick={() => alert('Proceed to checkout')}>Checkout</button>
        </div>
      ) : (
        <p>No items in the cart</p>
      )}
    </div>
  );
};

export default CartPage;
