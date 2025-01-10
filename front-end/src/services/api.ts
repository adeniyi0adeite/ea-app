import axios from "axios";

// Define base URL for the API
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});


// product mock
export const getProductMock = async () => {
    // Mocked product data
    return [
      { id: 1, name: "Product 1", description: "Description for Product 1", price: 100 },
      { id: 2, name: "Product 2", description: "Description for Product 2", price: 200 },
      { id: 3, name: "Product 3", description: "Description for Product 3", price: 300 },
    ];
};
  


export const getProducts = async () => {
  try {
    const response = await API.get("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export const addToCart = async (productId: number) => {
  try {
    const response = await API.post("/cart", { productId });
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};
