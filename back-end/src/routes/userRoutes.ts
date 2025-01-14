import { Router } from 'express';
import { register, login, profile, getAll } from '../controllers/userController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

// Register a new user
router.post('/register', register);

// Login user
router.post('/login', login);

// Get user profile
router.get('/profile', authenticate as any, profile);

// Get all users
router.get('/users', authenticate as any, getAll);

export const userRoutes = router;