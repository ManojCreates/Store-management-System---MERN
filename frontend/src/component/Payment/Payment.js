import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Payment.css';
import Nav from "../nav/customernav";

function Payment() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { totalPrice } = state || { totalPrice: 0 }; // Default to 0 if no state

  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [email, setEmail] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  // Load saved payment details on component mount
  useEffect(() => {
    const savedPaymentDetails = JSON.parse(localStorage.getItem('paymentDetails'));
    if (savedPaymentDetails) {
      setCardNumber(savedPaymentDetails.cardNumber || '');
      setCardName(savedPaymentDetails.cardName || '');
      setExpiryDate(savedPaymentDetails.expiryDate || '');
      setCvv(savedPaymentDetails.cvv || '');
      setEmail(savedPaymentDetails.email || '');
      setDeliveryAddress(savedPaymentDetails.deliveryAddress || '');
    }
  }, []);

  const isExpiryDateValid = (expiry) => {
    const [month, year] = expiry.split('/');
    const currentDate = new Date();
    const expiryDate = new Date(`20${year}`, month - 1); // Parse to year/month
    return expiryDate > currentDate;
  };

  const isEmailValid = (email) => /\S+@\S+\.\S+/.test(email);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    // Card number validation
    if (!/^\d{16}$/.test(cardNumber.replace(/-/g, ''))) {
      alert('Please enter a valid card number.');
      return;
    }

    // Expiry date validation
    if (!isExpiryDateValid(expiryDate)) {
      alert('Please enter a valid expiry date.');
      return;
    }

    // CVV validation
    if (cardNumber.startsWith('3') && cvv.length !== 4) {
      alert('Please enter a valid 4-digit CVV for American Express.');
      return;
    }

    if (!cardNumber.startsWith('3') && cvv.length !== 3) {
      alert('Please enter a valid 3-digit CVV.');
      return;
    }

    // Email validation
    if (!isEmailValid(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    const orderNumber = `ORD-${Date.now()}`; // Generate unique order number
    const orderedAt = new Date().toLocaleString(); // Get current date and time

    // Store order details in localStorage
    const orderDetails = {
      orderNumber,
      email,
      deliveryAddress,
      cardNumber: `**** **** **** ${cardNumber.slice(-4)}`, // Mask card number
      totalPrice,
      orderedAt,
    };

    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    localStorage.setItem('orders', JSON.stringify([...existingOrders, orderDetails]));

    // Store payment details (including sensitive data) in localStorage for future auto-fill
    const paymentDetails = {
      cardNumber,
      cardName,
      expiryDate,
      cvv,
      email,
      deliveryAddress,
    };
    localStorage.setItem('paymentDetails', JSON.stringify(paymentDetails));

    // Navigate to the My Orders page
    navigate('/myorders');
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove all non-digit characters
    const formattedValue = value.replace(/(\d{4})/g, '$1-').slice(0, 19); // Format with dashes
    setCardNumber(formattedValue);
  };

  const handleCardNameChange = (e) => {
    const value = e.target.value.replace(/[^A-Za-z\s]/g, ''); // Only letters and spaces
    setCardName(value);
  };

  const handleExpiryDateChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove all non-digit characters
    const formattedValue = value.length > 2 ? `${value.slice(0, 2)}/${value.slice(2, 4)}` : value; // Format with slash
    setExpiryDate(formattedValue);
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove all non-digit characters
    setCvv(value.slice(0, 3)); // Limit to 3 digits
  };

  return (
    <div className="payment-container">
      <Nav /> {/* Navigation bar */}
      <h1>Payment</h1>
      <div className="total-price">Total Price: RS {totalPrice.toFixed(2)}</div>

      <form id="payment-form" onSubmit={handlePaymentSubmit}>
        <div className="form-group">
          <label htmlFor="card-number">Card Number:</label>
          <input
            type="text"
            id="card-number"
            value={cardNumber}
            onChange={handleCardNumberChange}
            maxLength="19" // Allow for dashes
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="card-name">Card Holder Name:</label>
          <input
            type="text"
            id="card-name"
            value={cardName}
            onChange={handleCardNameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="expiry-date">Expiry Date (MM/YY):</label>
          <input
            type="text"
            id="expiry-date"
            value={expiryDate}
            onChange={handleExpiryDateChange}
            required
            placeholder="MM/YY"
            maxLength="5" // Allow for MM/YY
          />
        </div>
        <div className="form-group">
          <label htmlFor="cvv">CVV:</label>
          <input
            type="text"
            id="cvv"
            value={cvv}
            onChange={handleCvvChange}
            maxLength="3" // Limit to 3 digits
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="delivery-address">Delivery Address:</label>
          <input
            type="text"
            id="delivery-address"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="pay-now-button">Pay Now</button>
      </form>
    </div>
  );
}

export default Payment;
