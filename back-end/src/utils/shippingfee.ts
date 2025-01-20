//utils/shippingfee.ts


// Utility function to calculate shipping fee based on location
const shippingFees: { [location: string]: number } = {
    "Downtown": 5.00,
    "Suburb": 7.50,
    "Rural Area": 12.00,
    "Industrial Zone": 10.00,
    "Airport": 15.00
};
  
export const calculateShippingFee = (deliveryDetails: { location: string }): number => {
    // Check if the location exists in the shippingFees dictionary
    const fee = shippingFees[deliveryDetails.location];
  
    // If location is found, return the corresponding fee, otherwise, return a default fee
    return fee !== undefined ? fee : 20.00; // Default fee if location is not listed
};
  
export const calculateOrderTotal = (cartItems: any[]): number => {
  return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
};