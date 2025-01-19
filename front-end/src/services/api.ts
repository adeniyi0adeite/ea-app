import axios, { AxiosError } from 'axios';
import { jwtDecode } from 'jwt-decode';  // Correct import

const API = axios.create({
  baseURL: 'http://localhost:5000/api',  // Ensure this is the correct base URL
});

export const registerUser = async (userData: { name: string; email: string; password: string }) => {
  const response = await API.post('/user/register', userData);
  return response.data;
};

export const loginUser = async (loginData: { email: string; password: string }) => {
  const response = await API.post('/user/login', loginData);
  return response.data;
};

export const getUserProfile = async (token: string) => {
  const response = await axios.get('http://localhost:5000/api/user/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAllProducts = async () => {
  const response = await API.get('/product');
  console.log('Products fetched:', response.data); // Add this line to see if products are being fetched
  return response.data;
};

export const getProductById = async (id: number) => {
  const response = await API.get(`/product/${id}`);
  return response.data;
};

export const uploadProduct = async (productData: { name: string; description: string; price: number; stock: number }) => {
  const response = await API.post('/product/create', productData);
  return response.data;
};

export const addToCart = async (productId: number, quantity: number = 1) => {
  try {
    const token = localStorage.getItem('token'); // Retrieve token
    if (!token) {
      throw new Error('No token found. Unauthorized');
    }

    const response = await API.post(
      `/cart/add`, 
      { productId, quantity },  // Only send productId and quantity
      { 
        headers: { Authorization: `Bearer ${token}` } // Include token in Authorization header
      }
    );
    console.log('Response from adding to cart:', response.data);
    return response.data; // Returning updated cart data or success confirmation
  } catch (error) {
    console.error('Error in API call to add to cart:', error);
    throw new Error('Error adding to cart');
  }
};

export const removeItemFromCart = async (userId: number, itemId: number) => {
  try {
    const token = localStorage.getItem('token'); // Retrieve token
    if (!token) {
      throw new Error('No token found. Unauthorized');
    }

    const response = await API.delete(`/cart/remove/${itemId}`, {
      headers: { Authorization: `Bearer ${token}` }, // Include token in Authorization header
      data: { userId }, // Include the userId in the body of the request
    });
    return response.data;
  } catch (error) {
    console.error('Error in API call to remove item from cart:', error);
    throw new Error('Error removing item from cart');
  }
};

export const getUserCartItems = async () => {
  try {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (!token) {
      throw new Error('No token found. Unauthorized');
    }

    const response = await API.get('/cart', {
      headers: { Authorization: `Bearer ${token}` }, // Pass token in the request header
    });

    return response.data; // Return the cart data from the response
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      // Handle specific case when the cart is empty
      if (error.response?.data?.message === 'No items in cart') {
        console.warn('The cart is empty.');
        return []; // Return an empty array when the cart is empty
      }
      
      // Handle other errors
      console.error('Error response:', error.response?.data); // Logs the error returned by the server
      throw new Error(`Error fetching cart items: ${error.response?.data.message || error.response?.data}`);
    } else {
      // Handle generic errors
      console.error('Error fetching user cart items:', (error as Error).message);
      throw new Error('Error fetching cart items');
    }
  }
};

// New function to update the cart item quantity
export const updateUserItemQuantity = async (productId: number, quantity: number) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found. Unauthorized');
    }

    const response = await API.put(
      `/cart/update`,  // Update the endpoint to match your backend API
      { productId, quantity },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log('Response from updating quantity:', response.data);
    return response.data; // Return updated cart item or success confirmation
  } catch (error) {
    console.error('Error in updating item quantity:', error);
    throw new Error('Error updating item quantity');
  }
};
