import axios from 'axios';
import knex from '../utils/db'; // Import knex to handle the transaction
import { findUserByEmail, createUser, getUserById, findAllUsers, validatePassword, generateToken } from '../models/User';

// Register a new user
export const registerUser = async (username: string, email: string, password: string) => {
  try {
    // Check if the user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Create new user
    const [newUserId] = await createUser(username, email, password);
    const newUser = await getUserById(newUserId);
    return newUser;
  } catch (error) {
    throw new Error(`Error registering user: ${(error as Error).message}`);
  }
};

// Login user
export const loginUser = async (email: string, password: string) => {
  try {
    // Find user by email
    const user = await findUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    // Validate password
    const isValid = await validatePassword(user.password, password);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const token = generateToken(user.id, user.email);
    return { token, user };
  } catch (error) {
    throw new Error(`Error logging in user: ${(error as Error).message}`);
  }
};

// Get user profile by ID
export const getUserProfile = async (id: number) => {
  try {
    const user = await getUserById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw new Error(`Error fetching user profile: ${(error as Error).message}`);
  }
};

// Get all users
export const getAllUsers = async () => {
  try {
    const users = await findAllUsers();
    return users;
  } catch (error) {
    throw new Error(`Error fetching users: ${(error as Error).message}`);
  }
};