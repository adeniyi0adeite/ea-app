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


// Assuming you have an API function for clearing the cart:
export const clearCart = async (userId: number) => {
  try {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (!token) {
      throw new Error('No token found. Unauthorized');
    }

    const response = await API.delete(`/cart/clear`, {
      headers: { Authorization: `Bearer ${token}` }, // Include token in Authorization header
      data: { userId }, // Include userId in the body of the request
    });

    console.log('Response from clearing cart:', response.data);
    return response.data; // Return success confirmation or any data from the backend
  } catch (error) {
    console.error('Error in API call to clear cart:', error);
    throw new Error('Error clearing cart');
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



export const getUserDeliveryDetails = async (userId: number) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found. Unauthorized');
    }

    const response = await API.get(`/delivery/details`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { userId }
    });

    return response.data.details;
  } catch (error) {
    console.error('Error fetching delivery details:', error);
    throw new Error('Error fetching delivery details');
  }
};


export const createUserDeliveryDetails = async (userId: number, details: { address: string, bustop: string, phone: string }) => {
  try {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (!token) {
      throw new Error('No token found. Unauthorized');
    }

    const response = await API.post(`/delivery/create`, details, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('Error creating delivery details:', error);
    throw new Error('Error creating delivery details');
  }
};



export const updateUserDeliveryDetails = async (userId: number, newDetails: { address: string, bustop: string, phone: string }) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found. Unauthorized');
    }

    const response = await API.put(`/delivery/update`, newDetails, {
      headers: { Authorization: `Bearer ${token}` },
      params: { userId }
    });

    return response.data;
  } catch (error) {
    console.error('Error updating delivery details:', error);
    throw new Error('Error updating delivery details');
  }
};


