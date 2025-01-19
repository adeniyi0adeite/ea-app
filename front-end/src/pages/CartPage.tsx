import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCartItems, removeItemFromCart as removeItemFromCartApi, updateUserItemQuantity, clearCart as clearCartApi } from '../services/api';
import { isAuthenticated, redirectIfNotAuthenticated, getUserIdFromToken } from '../utils/auth';
import { RootState } from '../redux/store/store';
import { setCartItems, removeFromCart, updateQuantity, clearCart } from '../redux/slices/cart/cartSlice';
import BasePage from './BasePage';

const CartPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items); // Get cart items from Redux store

  useEffect(() => {
    if (!isAuthenticated()) {
      redirectIfNotAuthenticated(navigate);
    }

    const fetchCartItems = async () => {
      try {
        const cartData = await getUserCartItems();
        dispatch(setCartItems(cartData)); // Dispatch to Redux store
      } catch (error) {
        setError('Failed to fetch cart items');
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [dispatch, navigate]);

  const handleRemoveFromCart = async (productId: number) => {
    try {
      const userId = getUserIdFromToken();
      if (userId) {
        await removeItemFromCartApi(userId, productId);
        dispatch(removeFromCart(productId)); // Dispatch to remove item from Redux store
      }
    } catch (error) {
      setError('Failed to remove item from cart');
    }
  };

  const handleClearCart = async () => {
    try {
      const userId = getUserIdFromToken();
      if (userId) {
        await clearCartApi(userId); // Clear cart on backend
        dispatch(clearCart()); // Dispatch to clear Redux cart
      }
    } catch (error) {
      setError('Failed to clear cart');
    }
  };

  const handleQuantityChange = async (productId: number, newQuantity: number) => {
    try {
      await updateUserItemQuantity(productId, newQuantity);
      dispatch(updateQuantity({ productId, quantity: newQuantity })); // Update quantity in Redux store
    } catch (error) {
      setError('Failed to update quantity');
    }
  };

  const handleQuantityIncrease = async (productId: number, currentQuantity: number) => {
    await handleQuantityChange(productId, currentQuantity + 1);
  };

  const handleQuantityDecrease = async (productId: number, currentQuantity: number) => {
    if (currentQuantity > 1) {
      await handleQuantityChange(productId, currentQuantity - 1);
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
            <span>{item.quantity.toString()}</span>
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
