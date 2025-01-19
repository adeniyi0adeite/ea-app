import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, addToCart as addToCartApi, removeItemFromCart as removeItemFromCartApi, getUserCartItems } from '../services/api';
import { isAuthenticated, getUserIdFromToken } from '../utils/auth';
import { RootState } from '../redux/store/store';
import { setCartItems, addToCart, removeFromCart } from '../redux/slices/cart/cartSlice';
import BasePage from './BasePage';

const ProductPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // Redux dispatch and cart items from the store
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await getAllProducts();
        setProducts(productList);
      } catch (error) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    const fetchCartItems = async () => {
      if (isAuthenticated()) {
        try {
          const userCartItems = await getUserCartItems();
          dispatch(setCartItems(userCartItems)); // Set cart items in Redux store
        } catch (error) {
          setError('Failed to fetch cart items');
        }
      }
    };

    fetchProducts();
    fetchCartItems(); // Fetch and update cart items when the page loads
  }, [dispatch]);

  const handleAddToCart = async (productId: number) => {
    if (!isAuthenticated()) {
      alert('You need to log in first!');
      return;
    }

    try {
      await addToCartApi(productId, 1); // Add product with quantity 1 by default
      alert('Product added to cart!');
      const updatedCartItems = await getUserCartItems(); // Re-fetch cart items
      dispatch(setCartItems(updatedCartItems)); // Update cart in Redux store
    } catch (error) {
      setError('Failed to add product to cart');
    }
  };

  const handleRemoveFromCart = async (productId: number) => {
    if (!isAuthenticated()) {
      alert('You need to log in first!');
      return;
    }

    try {
      await removeItemFromCartApi(getUserIdFromToken()!, productId);
      const updatedCartItems = await getUserCartItems(); // Re-fetch cart items after removal
      dispatch(setCartItems(updatedCartItems)); // Update cart in Redux store
    } catch (error) {
      setError('Failed to remove product from cart');
    }
  };

  const isProductInCart = (productId: number) => {
    return cartItems.some(item => item.productId === productId);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <BasePage>
      <div className="container mt-5">
        <h1 className="text-center mb-4">Product Catalog</h1>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="row">
          {products.length === 0 ? (
            <div className="col-12">
              <div>Your product catalog is empty.</div>
            </div>
          ) : (
            products.map((product) => {
              const isInCart = isProductInCart(product.id);
              return (
                <div key={product.id} className="col-md-4 mb-4">
                  <div className="card">
                    <img
                      src={product.imageUrl} // Assuming there's an image URL in the product data
                      className="card-img-top"
                      alt={product.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">{product.description}</p>
                      <p className="card-text">
                        <strong>${product.price}</strong>
                      </p>
                      <button
                        className={`btn ${isInCart ? 'btn-danger' : 'btn-primary'}`}
                        onClick={() => isInCart ? handleRemoveFromCart(product.id) : handleAddToCart(product.id)}
                      >
                        {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </BasePage>
  );
};

export default ProductPage;
