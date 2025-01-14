import { Request, Response } from 'express';
import { registerUser, loginUser, getUserProfile, getAllUsers } from '../services/userService';

// Register a new user
export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await registerUser(username, email, password);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

// Login user
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const { token, user } = await loginUser(email, password);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

// Get user profile
export const profile = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  try {
    const user = await getUserProfile(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: (error as Error).message });
  }
};

// Get all users
export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};