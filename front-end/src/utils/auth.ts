import { jwtDecode } from 'jwt-decode';  // Correct import
import { useNavigate } from 'react-router-dom';  // If needed for redirecting in auth-related tasks

// Utility function to check if the user is authenticated
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const decodedToken: any = jwtDecode(token);  // Correct usage of jwt-decode
    const currentTime = Date.now() / 1000; // Current time in seconds
    if (decodedToken.exp < currentTime) {
      // Token has expired
      return false;
    }
    return true;
  } catch (error) {
    console.error('Invalid token:', error);
    return false;
  }
};

// Utility function to get the user ID from the token
export const getUserIdFromToken = (): number | null => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decodedToken: any = jwtDecode(token);  // Correct usage of jwt-decode
    return decodedToken.id; // Assuming the user ID is in the token's payload
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

// Utility function to handle redirection when the user is not authenticated
export const redirectIfNotAuthenticated = (navigate: any): void => {
  if (!isAuthenticated()) {
    localStorage.removeItem('token'); // Remove expired or invalid token
    navigate('/'); // Redirect to homepage
  }
};

