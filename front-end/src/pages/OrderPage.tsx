import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCartItems, getUserDeliveryDetails, createUserDeliveryDetails, updateUserDeliveryDetails } from '../services/api'; // Include createUserDeliveryDetails
import { isAuthenticated, redirectIfNotAuthenticated, getUserIdFromToken } from '../utils/auth';
import { RootState } from '../redux/store/store';
import { setCartItems } from '../redux/slices/cart/cartSlice';
import BasePage from './BasePage';

const OrderPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [deliveryDetails, setDeliveryDetails] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedDetails, setEditedDetails] = useState<{
    delivery_address: string;
    nearest_bustop: string;
    phone_number: string;
  }>({
    delivery_address: '',
    nearest_bustop: '',
    phone_number: ''
  });
  const [shippingFee, setShippingFee] = useState<number>(0);
  const [proceedToPayment, setProceedToPayment] = useState<boolean>(false); 
  const userId = getUserIdFromToken();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items); 

  useEffect(() => {
    if (!isAuthenticated()) {
      redirectIfNotAuthenticated(navigate);
    }

    const fetchCartItems = async () => {
      try {
        const cartData = await getUserCartItems();
        dispatch(setCartItems(cartData)); 
      } catch (error) {
        setError('Failed to fetch cart items');
      } finally {
        setLoading(false);
      }
    };

    const fetchDeliveryDetails = async () => {
      try {
        if (userId) {
          const details = await getUserDeliveryDetails(Number(userId));
          setDeliveryDetails(details);
        }
      } catch (error) {
        setError('Failed to fetch delivery details');
      }
    };

    fetchCartItems();
    fetchDeliveryDetails();
  }, [dispatch, navigate, userId]);

  const calculateShippingFee = (address: string) => {
    return address.includes('Downtown') ? 5 : 10;
  };

  const handleEditClick = () => {
    if (deliveryDetails) {
      setEditedDetails({
        delivery_address: deliveryDetails.delivery_address,
        nearest_bustop: deliveryDetails.nearest_bustop,
        phone_number: deliveryDetails.phone_number
      });
      setIsEditing(true);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setError('');
  };

  const handleSaveChanges = async () => {
    try {
      if (userId) {
        if (!deliveryDetails) {
          // If no existing details, create new ones
          await createUserDeliveryDetails(Number(userId), {
            address: editedDetails.delivery_address,
            bustop: editedDetails.nearest_bustop,
            phone: editedDetails.phone_number,
          });
        } else {
          // If existing details, update them
          await updateUserDeliveryDetails(Number(userId), {
            address: editedDetails.delivery_address,
            bustop: editedDetails.nearest_bustop,
            phone: editedDetails.phone_number,
          });
        }

        // Update local state
        setDeliveryDetails({
          ...deliveryDetails,
          ...editedDetails
        });

        setIsEditing(false);
        setError('');
      }
    } catch (error) {
      setError('Failed to update delivery details');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProceedToPayment = () => {
    if (deliveryDetails && deliveryDetails.delivery_address) {
      setShippingFee(calculateShippingFee(deliveryDetails.delivery_address)); 
      setProceedToPayment(true); 
    } else {
      setError('Delivery details are missing or incomplete.');
    }
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0) + shippingFee;
  };

  if (loading) return <div>Loading...</div>;

  const totalAmount = calculateTotalAmount();

  return (
    <BasePage>
      <div className="container">
        <h1 className="my-4">Order Page</h1>
        {error && <div className="alert alert-danger">{error}</div>}

        <section>
          <h3>Delivery Details</h3>
          {(!deliveryDetails || isEditing) ? (
            <div>
              <div className="form-group mb-2">
                <label>Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="delivery_address"
                  value={editedDetails.delivery_address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group mb-2">
                <label>Nearest Bustop</label>
                <input
                  type="text"
                  className="form-control"
                  name="nearest_bustop"
                  value={editedDetails.nearest_bustop}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group mb-2">
                <label>Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone_number"
                  value={editedDetails.phone_number}
                  onChange={handleInputChange}
                />
              </div>
              <div className="btn-group">
                <button 
                  className="btn btn-success" 
                  onClick={handleSaveChanges}
                >
                  {deliveryDetails ? 'Save Changes' : 'Create Delivery Details'}
                </button>
                {deliveryDetails && (
                  <button 
                    className="btn btn-secondary" 
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div key={deliveryDetails.id}>
              <p><strong>Address:</strong> {deliveryDetails.delivery_address}</p>
              <p><strong>Nearest Bustop:</strong> {deliveryDetails.nearest_bustop}</p>
              <p><strong>Phone Number:</strong> {deliveryDetails.phone_number}</p>
              <button 
                className="btn btn-primary" 
                onClick={handleEditClick}
              >
                Edit
              </button>
            </div>
          )}
        </section>

        <section>
          <h3>Order Summary</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.productId}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price}</td>
                  <td>${item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4>Shipping Fee: ${shippingFee.toFixed(2)}</h4> 
          <h4>Total Amount: ${totalAmount.toFixed(2)}</h4>
        </section>

        {!proceedToPayment && (
          <button className="btn btn-success" onClick={handleProceedToPayment}>
            Proceed to Payment
          </button>
        )}
      </div>
    </BasePage>
  );
};

export default OrderPage;
