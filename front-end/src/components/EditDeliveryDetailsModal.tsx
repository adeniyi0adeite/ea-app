import React, { useState } from 'react';

interface DeliveryDetails {
  address: string;
  nearest_bustop: string;
  phone_number: string;
}

interface EditDeliveryModalProps {
  show: boolean;
  onClose: () => void;
  deliveryDetails: DeliveryDetails;
  onUpdate: (updatedDetails: DeliveryDetails) => void;
}

const EditDeliveryModal: React.FC<EditDeliveryModalProps> = ({ show, onClose, deliveryDetails, onUpdate }) => {
  const [updatedDetails, setUpdatedDetails] = useState<DeliveryDetails>(deliveryDetails);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(updatedDetails); // Call the parent function to update the delivery details
    onClose(); // Close the modal after updating
  };

  if (!show) return null;

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Delivery Details</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={updatedDetails.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Nearest Bustop</label>
                <input
                  type="text"
                  className="form-control"
                  name="nearest_bustop"
                  value={updatedDetails.nearest_bustop}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone_number"
                  value={updatedDetails.phone_number}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDeliveryModal;
