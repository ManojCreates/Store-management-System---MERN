import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf'; // Import jsPDF
import './MyOrders.css';
import Nav from "../nav/customernav";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(savedOrders);
  }, []);

  const handleUpdateAddress = (orderIndex) => {
    const newAddress = prompt("Enter new delivery address:");
    if (newAddress) {
      const updatedOrders = [...orders];
      updatedOrders[orderIndex].deliveryAddress = newAddress;
      setOrders(updatedOrders);
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
    }
  };

  const handleCancelOrder = (orderIndex) => {
    const orderDate = new Date(orders[orderIndex].orderedAt);
    const now = new Date();
    const timeDifference = now - orderDate;
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day

    if (timeDifference < oneDay) {
      const updatedOrders = orders.filter((_, index) => index !== orderIndex);
      setOrders(updatedOrders);
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
    } else {
      alert('Order cannot be canceled after 1 day.');
    }
  };

  // New function to clear order history
  const handleClearOrderHistory = () => {
    const confirmClear = window.confirm("Are you sure you want to clear your order history?");
    if (confirmClear) {
      setOrders([]); // Clear the orders from state
      localStorage.removeItem('orders'); // Remove orders from localStorage
    }
  };

  // Function to generate a PDF bill
  const generatePDFBill = (order) => {
    const doc = new jsPDF();
    const margin = 10;

    // Add a heading
    doc.setFontSize(20);
    doc.text("Lanka Glass House", margin, margin + 10);
    
    // Add invoice details
    doc.setFontSize(14);
    doc.text("Invoice", margin, margin + 30);
    
    // Line break
    doc.line(margin, margin + 32, 200 - margin, margin + 32);

    // Add order details
    doc.setFontSize(12);
    doc.text(`Order Number: ${order.orderNumber}`, margin, margin + 40);
    doc.text(`Customer Email: ${order.email}`, margin, margin + 50);
    doc.text(`Delivery Address: ${order.deliveryAddress}`, margin, margin + 60);
    doc.text(`Payment By (Card Number): ${order.cardNumber}`, margin, margin + 70);
    doc.text(`Total Price: RS ${order.totalPrice ? order.totalPrice.toFixed(2) : 'N/A'}`, margin, margin + 80);
    doc.text(`Ordered At: ${order.orderedAt}`, margin, margin + 90);

    // Footer
    doc.setFontSize(10);
    doc.text("Thank you for shopping with us!", margin, 200);
    doc.text("For any inquiries, please contact us.", margin, 210);

    // Save the PDF
    doc.save(`${order.orderNumber}_bill.pdf`);
  };

  console.log(orders); // Debug: Log orders to check their structure

  if (orders.length === 0) {
    return <div>No orders found.</div>;
  }

  return (
    <div className="my-orders-container">
      <Nav />
      <h1>My Orders</h1>
      {orders.map((order, index) => (
        <div key={index} className="order-card">
          <p><strong>Order Number:</strong> {order.orderNumber}</p>
          <p><strong>Customer Email:</strong> {order.email}</p>
          <p><strong>Delivery Address:</strong> {order.deliveryAddress}</p>
          <p><strong>Payment By (Card Number):</strong> {order.cardNumber}</p>
          <p><strong>Amount:</strong> RS {order.totalPrice ? order.totalPrice.toFixed(2) : 'N/A'}</p>
          <p><strong>Ordered At:</strong> {order.orderedAt}</p>
          <div className="order-actions">
            <button onClick={() => handleUpdateAddress(index)}>Update Address</button>
            <button onClick={() => handleCancelOrder(index)}>Cancel Order</button>
            <button onClick={() => generatePDFBill(order)} className="download-bill-button">Download Bill</button>
          </div>
        </div>
      ))}
      <button onClick={handleClearOrderHistory} className="clear-history-button">Clear Order History</button>
    </div>
  );
}

export default MyOrders;
