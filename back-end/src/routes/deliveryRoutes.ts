import { Router } from 'express';
import { 
    getUserDeliveryDetailsController, 
    createUserDeliveryDetailsController, 
    updateUserDeliveryDetailsController, 
    deleteUserDeliveryDetailsController 
} from '../controllers/deliveryController';
import { authenticate } from '../middleware/authMiddleware'; // Import the authenticate middleware

const router = Router();

// Route to get user delivery details
router.get('/details', authenticate, getUserDeliveryDetailsController);

// Route to create new delivery details
router.post('/create', authenticate, createUserDeliveryDetailsController);

// Route to update user delivery details
router.put('/update', authenticate, updateUserDeliveryDetailsController);

// Route to delete user delivery details
router.delete('/delete', authenticate, deleteUserDeliveryDetailsController);

export const deliveryRoutes = router;
