import axios from "axios";

// Define base URL for the API
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Your backend server URL
});



export const addProduct = async (product: { name: string; description: string; price: number }) => {
  try {
    const response = await API.post('/products', product);
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error; // Rethrow error to handle it in the component
  }
};



// Fetch products from backend
export const getProducts = async () => {
  try {
    const response = await API.get("/products");
    return response.data; // Assuming your API returns an array of products
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// Fetch product by ID from backend
export const getProductById = async (id: number) => {
  try {
    const response = await API.get(`/products/${id}`); // Fetch single product
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
  }
};

// Add product to cart (calls backend API)
export const addToCart = async (productId: number) => {
  try {
    const response = await API.post("/cart", { productId });
    return response.data; // Handle the response (e.g., cart update)
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};
