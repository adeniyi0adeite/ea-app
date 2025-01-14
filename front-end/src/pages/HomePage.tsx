import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserProfile } from "../services/api";

const HomePage = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userProfile = await getUserProfile(token);
          setUser(userProfile.user);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="home-page">
      <h1>Welcome to the E-Commerce Store</h1>
      {user ? (
        <div>
          <p>Hello, {user.name}</p>
          <Link to="/profile">User Profile</Link>
        </div>
      ) : (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;