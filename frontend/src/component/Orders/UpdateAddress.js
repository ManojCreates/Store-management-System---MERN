// src/components/Orders/UpdateAddress.js

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './UpdateAddress.css';  // Assuming you're using the same CSS for styling

function UpdateAddress() {
  const [newAddress, setNewAddress] = useState('');
  const { id } = useParams();  // Get order ID from URL params
  const navigate = useNavigate();

  const handleUpdateAddress = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/orders/${id}/update`, { newAddress });
      alert('Address updated successfully!');
      navigate('/myorders');  // Navigate back to the orders page
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  return (
    <div className="update-address-container">
      <h1>Update Order Address</h1>
      <form onSubmit={handleUpdateAddress}>
        <label>New Address:</label>
        <input
          type="text"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
          required
        />
        <button type="submit">Update Address</button>
      </form>
    </div>
  );
}

export default UpdateAddress;
