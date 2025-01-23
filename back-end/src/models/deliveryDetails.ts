// models/deliveryDetails

import knex from '../utils/db';

export interface UserDeliveryDetails {
  id: number;
  userId: number;
  delivery_address: string;
  nearest_bustop: string;
  phone_number: string;
  createdAt: string;
  updatedAt: string;
}

// Get user delivery details by userId
export const getUserDeliveryDetails = (userId: number): Promise<UserDeliveryDetails | undefined> => {
  return knex('user_delivery_details').where({ userId }).first();
};

// Insert new user delivery details
export const insertUserDeliveryDetails = (details: Partial<UserDeliveryDetails>): Promise<number[]> => {
  return knex('user_delivery_details').insert(details);
};

// Update user delivery details
export const updateUserDeliveryDetails = (userId: number, details: Partial<UserDeliveryDetails>): Promise<void> => {
  return knex('user_delivery_details').where({ userId }).update(details);
};

// Delete user delivery details by userId
export const deleteUserDeliveryDetails = (userId: number): Promise<void> => {
  return knex('user_delivery_details').where({ userId }).del();
};
