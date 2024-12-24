import React from 'react';
import Nav from "../nav/nav";
import './AdminHome.css';

const AdminHome = () => {
  return (
    <div>     <Nav />
    <div className="admin-home-container">
 
      <div className="admin-home-content">
        <h1>Admin Dashboard</h1>
        <div className="admin-home-cards">
          <div className="card">
            <h2>Total Orders</h2>
            <p>150</p>
          </div>
          <div className="card">
            <h2>Total Products</h2>
            <p>75</p>
          </div>
          <div className="card">
            <h2>Total Customers</h2>
            <p>300</p>
          </div>
          <div className="card">
            <h2>Pending Deliveries</h2>
            <p>5</p>
          </div>
        </div>
        <div className="admin-home-actions">
          <button className="action-button">View All Orders</button>
          <button className="action-button">Manage Products</button>
          <button className="action-button">View Customer Feedback</button>
          <button className="action-button">Generate Reports</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminHome;
