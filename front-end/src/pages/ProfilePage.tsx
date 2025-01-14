import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../services/api';

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('You need to login first.');
          navigate('/login');
          return;
        }

        const userProfile = await getUserProfile(token);
        setUser(userProfile);
      } catch (error) {
        console.error('Error fetching profile:', error);
        alert('Failed to fetch user profile');
        navigate('/login');
      }
    };

    fetchProfile();
  }, [navigate]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default ProfilePage;
