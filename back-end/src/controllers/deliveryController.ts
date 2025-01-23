import { Request, Response } from 'express';
import { fetchUserDeliveryDetails, createUserDeliveryDetails, modifyUserDeliveryDetails, removeUserDeliveryDetails } from '../services/deliveryService';

export const getUserDeliveryDetailsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const details = await fetchUserDeliveryDetails(userId);
    if (!details) {
      res.status(404).json({ success: false, message: 'Delivery details not found' });
      return; // Ensure nothing else is returned
    }
    res.json({ success: true, details });
  } catch (error) {
    res.status(500).json({ success: false, message: 'An unknown error occurred' });
  }
};

export const createUserDeliveryDetailsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const { address, bustop, phone } = req.body;

    // Validate input
    if (!address || !bustop || !phone) {
      res.status(400).json({ success: false, message: 'Missing address, nearest bustop, or phone number' });
      return;
    }

    await createUserDeliveryDetails(userId, { address, bustop, phone });
    res.json({ success: true, message: 'Delivery details created successfully' });
  } catch (error) {
    console.error('Error creating delivery details:', error);
    res.status(500).json({ success: false, message: 'An unknown error occurred' });
  }
};

export const updateUserDeliveryDetailsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const { address, bustop, phone } = req.body;

    // Validate input
    if (!address || !bustop || !phone) {
      res.status(400).json({ success: false, message: 'Missing address, nearest bustop, or phone number' });
      return;
    }

    // Update the delivery details
    await modifyUserDeliveryDetails(userId, { address, bustop, phone });

    // Send a successful response
    res.json({ success: true, message: 'Delivery details updated successfully' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error updating delivery details:', errorMessage);
    res.status(500).json({ success: false, message: errorMessage });
  }
};

export const deleteUserDeliveryDetailsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    await removeUserDeliveryDetails(userId);
    res.json({ success: true, message: 'Delivery details deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'An unknown error occurred' });
  }
};
