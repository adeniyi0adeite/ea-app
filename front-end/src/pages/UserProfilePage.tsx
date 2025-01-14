import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../services/api'; // Implement the API service

const UserProfilePage = () => {
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

  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserProfilePage;
