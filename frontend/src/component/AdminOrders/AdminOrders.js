import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import the autoTable plugin
import './AdminOrders.css';
import Nav from "../nav/nav";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(savedOrders);
  }, []);

  const handlOrder = (orderIndex) => {
    const updatedOrders = orders.filter((_, index) => index !== orderIndex);
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    alert('Order has been Delivered Successfully.');
  };

  const downloadReport = () => {
    const doc = new jsPDF();
    const headers = ["Order Number", "Customer Email", "Delivery Address", "Amount", "Ordered At"];
    const data = orders.map(order => [
      order.orderNumber,
      order.email,
      order.deliveryAddress,
      `RS ${order.totalPrice.toFixed(2)}`,
      new Date(order.orderedAt).toLocaleString(),
    ]);

    doc.autoTable({
      head: [headers],
      body: data,
      startY: 20,
    });

    doc.text("Admin Orders Report", 14, 15);
    doc.save("orders_report.pdf");
  };

  const filteredOrders = orders.filter(order => 
    order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (`RS ${order.totalPrice.toFixed(2)}`).includes(searchQuery) // Added this line for amount search
  );

  return (
    <div>
      <Nav />
      <div className="admin-orders-container">
        <h1>Admin Orders</h1>
        <button onClick={downloadReport} className="download-report-button">Download PDF Report</button>
        <input 
          type="text" 
          placeholder="Search by Order Number, Email or Amount" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
        {filteredOrders.length === 0 ? (
          <div>No orders found.</div>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order Number</th>
                <th>Customer Email</th>
                <th>Delivery Address</th>
                <th>Amount</th>
                <th>Ordered At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <tr key={index}>
                  <td>{order.orderNumber}</td>
                  <td>{order.email}</td>
                  <td>{order.deliveryAddress}</td>
                  <td>RS {order.totalPrice.toFixed(2)}</td>
                  <td>{new Date(order.orderedAt).toLocaleString()}</td>
                  <td>
                    <button onClick={() => handlOrder(index)}>Order Delivered</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminOrders;
