import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { getUserCartItems } from '../services/api';
import { setCartItems } from '../redux/slices/cart/cartSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItemCount = useSelector((state: RootState) => state.cart.items.length);

  useEffect(() => {
    const fetchCartItemCount = async () => {
      if (isAuthenticated()) {
        try {
          const cartItems = await getUserCartItems();
          dispatch(setCartItems(cartItems));
        } catch (error) {
          console.error('Failed to fetch cart items');
        }
      }
    };

    fetchCartItemCount();
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">E-Shop</Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                Cart
                {cartItemCount > 0 && (
                  <sup className="badge bg-danger ms-1">{cartItemCount}</sup>
                )}
              </Link>
            </li>
            {isAuthenticated() ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">Profile</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
