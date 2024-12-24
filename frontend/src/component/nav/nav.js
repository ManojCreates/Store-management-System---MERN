import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminNav.css';

function AdminNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div id="admin-navigation-unique">
      {/* Toggle button visible on small screens */}
      <button id="toggle-menu-button-unique" onClick={toggleMenu}>
        ☰ Admin Menu
      </button>
      <div id="menu-wrapper-unique" className={isMenuOpen ? 'show-menu' : ''}>
        <ul id="menu-list-unique">
          <li id="menu-item-home" className="menu-item">
            <Link to="/adminhome" id="menu-link-home" className="menu-link">
              Home
            </Link>
          </li>
          <li id="menu-item-add-product" className="menu-item">
            <Link to="/addproduct" id="menu-link-add-product" className="menu-link">
              Add Product
            </Link>
          </li>
          <li id="menu-item-manage-products" className="menu-item">
            <Link to="/productdetails" id="menu-link-manage-products" className="menu-link">
              Manage Products
            </Link>
          </li>
          <li id="menu-item-manage-orders" className="menu-item">
            <Link to="/AdminOrders" id="menu-link-manage-orders" className="menu-link">
              Manage Orders
            </Link>
          </li>
          <li id="menu-item-requested-deliveries" className="menu-item">
            <Link to="/customerdeliverydetails" id="menu-link-requested-deliveries" className="menu-link">
              Requested Deliveries
            </Link>
          </li>
          <li id="menu-item-processing-deliveries" className="menu-item">
            <Link to="/admindeliverydetails" id="menu-link-processing-deliveries" className="menu-link">
              Processing Deliveries
            </Link>
          </li>
          <li id="menu-item-requested-maintenances" className="menu-item">
            <Link to="/customermaintenancedetails" id="menu-link-requested-maintenances" className="menu-link">
              Requested Maintenances
            </Link>
          </li>
          <li id="menu-item-processing-maintenances" className="menu-item">
            <Link to="/adminmaintenancedetails" id="menu-link-processing-maintenances" className="menu-link">
              Processing Maintenances
            </Link>
          </li>
          <li id="menu-item-add-supplier" className="menu-item">
            <Link to="/addsupplier" id="menu-link-add-supplier" className="menu-link">
              Add Supplier
            </Link>
          </li>
          <li id="menu-item-suppliers" className="menu-item">
            <Link to="/supplierdetails" id="menu-link-suppliers" className="menu-link">
              Suppliers
            </Link>

            </li>
          <li id="menu-item-register" className="menu-item register">
            <Link to="/addemployee" id="menu-link-register" className="menu-link">
              Register
            </Link>
          </li>
          <li id="menu-item-profile" className="menu-item profile">
            <Link to="/employeedetails" id="menu-link-profile" className="menu-link">
              Profile
            </Link>
          </li>
          <li id="menu-item-logout" className="menu-item logout">
            <Link to="/mainhome" id="menu-link-logout" className="menu-link">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AdminNav;
