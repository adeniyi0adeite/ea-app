import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
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
  const response = await API.get('/user/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


export const getAllProducts = async () => {
  const response = await API.get('/product');
  return response.data;
};

export const uploadProduct = async (productData: { name: string; description: string; price: number; stock: number }) => {
  const response = await API.post('/product/create', productData);
  return response.data;
};