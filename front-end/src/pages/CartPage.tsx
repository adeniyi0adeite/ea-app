import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserCartItems, removeItemFromCart, updateUserItemQuantity } from '../services/api';
import { isAuthenticated, redirectIfNotAuthenticated, getUserIdFromToken } from '../utils/auth';
import BasePage from './BasePage';




const CartPage = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      redirectIfNotAuthenticated(navigate);
    }

    const fetchData = async () => {
      try {
        const cartData = await getUserCartItems();
        setCartItems(cartData);
      } catch (error) {
        setError('Failed to fetch cart items');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleRemoveFromCart = async (productId: number) => {
    try {
      const userId = getUserIdFromToken();
      if (userId) {
        await removeItemFromCart(userId, productId);
        setCartItems(prevCartItems => prevCartItems.filter(item => item.productId !== productId));
      }
    } catch (error) {
      setError('Failed to remove item from cart');
    }
  };

  const handleClearCart = async () => {
    try {
      const userId = getUserIdFromToken();
      if (userId) {
        // Call the clear cart API function
        // API function for clearing the cart can be implemented if required
        setCartItems([]);  // Optimistically clear the cart
      }
    } catch (error) {
      setError('Failed to clear cart');
    }
  };

  const handleQuantityIncrease = async (productId: number, currentQuantity: number) => {
    const newQuantity = currentQuantity + 1;
    await handleQuantityChange(productId, newQuantity);
  };

  const handleQuantityDecrease = async (productId: number, currentQuantity: number) => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      await handleQuantityChange(productId, newQuantity);
    }
  };

  const handleQuantityChange = async (productId: number, newQuantity: number) => {
    try {
      const updatedItem = await updateUserItemQuantity(productId, newQuantity);
      setCartItems(prevCartItems =>
        prevCartItems.map(item =>
          item.productId === productId ? { ...item, quantity: updatedItem.quantity } : item
        )
      );
    } catch (error) {
      setError('Failed to update quantity');
    }
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const renderCartItems = () => {
    return cartItems.map(item => (
      <tr key={item.productId}>
        <td>{item.name}</td>
        <td>
          <div className="d-flex align-items-center">
            <button
              className="btn btn-secondary btn-sm me-2"
              onClick={() => handleQuantityDecrease(item.productId, item.quantity)}
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              className="btn btn-secondary btn-sm ms-2"
              onClick={() => handleQuantityIncrease(item.productId, item.quantity)}
            >
              +
            </button>
          </div>
        </td>
        <td>${item.price}</td>
        <td>${item.price * item.quantity}</td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => handleRemoveFromCart(item.productId)}
          >
            Remove
          </button>
        </td>
      </tr>
    ));
  };

  if (loading) return <div>Loading...</div>;

  const totalAmount = calculateTotalAmount();

  return (
    <BasePage>
        <div className="container">
        <h1 className="my-4">Your Cart</h1>
        {error && <div className="alert alert-danger">{error}</div>}

        {cartItems.length === 0 ? (
            <div>Your cart is empty.</div>
        ) : (
            <>
            <table className="table">
                <thead>
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>{renderCartItems()}</tbody>
            </table>

            <div className="d-flex justify-content-between">
                <button className="btn btn-danger" onClick={handleClearCart}>Clear Cart</button>
                <div>
                <h4>Total: ${totalAmount.toFixed(2)}</h4>
                <button className="btn btn-primary">Checkout</button>
                </div>
            </div>
            </>
        )}
        </div>
    </BasePage>
  );
};

export default CartPage;
