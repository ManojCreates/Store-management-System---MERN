import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Customernav.css';

function CustomerNav() {
  const { cart } = useCart();
  const totalItemsInCart = cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0;

  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    setIsScrolled(offset > 50);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`nav-container ${isScrolled ? 'scrolled' : ''}`}>
      {/* Logo Section */}
      <div className="nav-logo">
        <img src="/Logo/LHG.png" alt="Logo" />
      </div>

      {/* Navigation Links */}
      <ul className="nav-ul">
        <li id="rr-menu-item-home" className="nav-li">
          <Link to="/customerhome" className="nav-link">Home</Link>
        </li>
        <li id="rr-menu-item-products" className="nav-li">
          <Link to="/customerproducts" className="nav-link">Products</Link>
        </li>
        <li id="rr-menu-item-request-delivery" className="nav-li">
          <Link to="/addcustomerdelivery" className="nav-link">Request Delivery</Link>
        </li>
        <li id="rr-menu-item-request-maintenance" className="nav-li">
          <Link to="/addcustomermaintenance" className="nav-link">Request Maintenance</Link>
        </li>
        <li id="rr-menu-item-payment-details" className="nav-li">
          <Link to="/PaymentDetails" className="nav-link">Payment Details</Link>
        </li>
        <li id="rr-menu-item-cart" className="nav-li">
          <Link to="/cart" className="nav-link">
            <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
            {totalItemsInCart > 0 && <span className="cart-count">{totalItemsInCart}</span>}
          </Link>
        </li>
        <li id="rr-menu-item-profile" className="nav-li">
          <Link to="/userdetails" className="nav-link">Profile</Link>
        </li>
      </ul>

      {/* Right-side links */}
      <div className="nav-right">
        <li id="rr-menu-item-register" className="menu-item register">
          <Link to="/adduser" className="menu-link">Register</Link>
        </li>
        <li id="rr-menu-item-logout" className="menu-item logout">
          <Link to="/mainhome" className="nav-link">Logout</Link>
        </li>
      </div>
    </div>
  );
}

export default CustomerNav;
