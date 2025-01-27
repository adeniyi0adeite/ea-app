import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import knex from '../utils/db'; // Ensure the correct path to knex instance
import { format } from 'date-fns';

export const findUserByEmail = async (email: string) => {
  return knex('users').where({ email }).first();
};

export const createUser = async (username: string = 'default_username', email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
  return knex('users').insert({ username, email, password: hashedPassword, createdAt: timestamp, updatedAt: timestamp });
};

export const getUserById = async (id: number) => {
  return knex('users').where({ id }).first();
};

export const findAllUsers = async () => {
  return knex('users').select('*'); // This fetches all columns for all users from the users table
};

// Add validatePassword method
export const validatePassword = async (storedPassword: string, inputPassword: string) => {
  return bcrypt.compare(inputPassword, storedPassword);
};

// Add generateToken method
export const generateToken = (userId: number, email: string) => {
  return jwt.sign({ id: userId, email }, process.env.JWT_SECRET as string, { expiresIn: '24h' });
};
