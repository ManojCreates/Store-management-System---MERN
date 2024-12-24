import React, { useEffect, useState } from 'react';
import './PaymentDetails.css';
import Nav from "../nav/customernav";

function PaymentDetails() {
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [editableDetails, setEditableDetails] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Retrieve payment details from localStorage
    const details = JSON.parse(localStorage.getItem('paymentDetails'));
    if (details) {
      setPaymentDetails(details);
      setEditableDetails(details); // Initialize editable details
    }
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setPaymentDetails(editableDetails);
    localStorage.setItem('paymentDetails', JSON.stringify(editableDetails));
    setSuccessMessage('Payment details updated successfully!');

    // Clear the success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleDelete = () => {
    localStorage.removeItem('paymentDetails');
    setPaymentDetails(null);
    setEditableDetails({});
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditableDetails(paymentDetails); // Reset to original details when editing starts
    }
  };

  if (!paymentDetails) {
    return <div>No payment details available.</div>;
  }

  return (
    <div >
      <Nav /> {/* Navigation bar */}
      <div className="payment-details-container">
      <h1>Payment Details</h1>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <div className="form-group">
        <label>Card Number:</label>
        <input
          type="text"
          name="cardNumber"
          value={editableDetails.cardNumber}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>
      <div className="form-group">
        <label>Card Holder Name:</label>
        <input
          type="text"
          name="cardName"
          value={editableDetails.cardName}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>
      <div className="form-group">
        <label>Expiry Date:</label>
        <input
          type="text"
          name="expiryDate"
          value={editableDetails.expiryDate}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>
      <div className="form-group">
        <label>CVV:</label>
        <input
          type="text"
          name="cvv"
          value={editableDetails.cvv}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>
      <div className="form-group">
        <label>Email Address:</label>
        <input
          type="email"
          name="email"
          value={editableDetails.email}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>
      <div className="form-group">
        <label>Delivery Address:</label>
        <input
          type="text"
          name="deliveryAddress"
          value={editableDetails.deliveryAddress}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>
      <button onClick={handleEditToggle} className="edit-button">
        {isEditing ? 'Cancel Edit' : 'Edit Payment Details'}
      </button>
      {isEditing && (
        <>
          <button onClick={handleSave} className="save-button">Save Changes</button>
          <button onClick={handleDelete} className="delete-button">Delete Payment Method</button>
        </>
      )}
         </div>
    </div>
  );
}

export default PaymentDetails;
