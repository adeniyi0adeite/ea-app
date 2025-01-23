import { getUserDeliveryDetails, insertUserDeliveryDetails, updateUserDeliveryDetails, deleteUserDeliveryDetails } from '../models/deliveryDetails';

export const fetchUserDeliveryDetails = async (userId: number) => {
  return getUserDeliveryDetails(userId);
};

export const createUserDeliveryDetails = async (userId: number, deliveryData: any) => {
  const currentDate = new Date();
  
  // Format to MySQL-compatible format: 'YYYY-MM-DD HH:MM:SS'
  const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

  const newDetails = {
    userId,
    delivery_address: deliveryData.address,
    nearest_bustop: deliveryData.bustop,
    phone_number: deliveryData.phone,
    createdAt: formattedDate, // Use the formatted date
    updatedAt: formattedDate, // Use the formatted date
  };

  console.log('Insert result:', newDetails);
  return insertUserDeliveryDetails(newDetails);
};

export const modifyUserDeliveryDetails = async (userId: number, deliveryData: any) => {
  try {
    const updatedDetails = {
      delivery_address: deliveryData.address,
      nearest_bustop: deliveryData.bustop,
      phone_number: deliveryData.phone,
      updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ') // Ensure proper timestamp format
    };

    // Perform the update in the database
    return await updateUserDeliveryDetails(userId, updatedDetails);
  } catch (error) {
    console.error('Error in modifyUserDeliveryDetails:', error);
    throw new Error('Failed to update delivery details');
  }
};

export const removeUserDeliveryDetails = async (userId: number) => {
  return deleteUserDeliveryDetails(userId);
};
