import React, { useState } from 'react';
import { useCart } from '../../CartContext';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import Nav from '../nav/customernav';

function Cart() {
  const { cart, updateCartItem, clearCart, removeItem } = useCart();
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState(''); // State for promo code
  const [isPromoApplied, setIsPromoApplied] = useState(false); // State to check if promo is applied

  // Function to calculate the discount based on quantity or total price
  const calculateDiscount = (totalPrice, totalItems) => {
    let discount = 0;

    // Example: 10% discount if total items in cart > 5
    if (totalItems > 5) {
      discount = 0.10 * totalPrice; // 10% discount
    }

    // Example: 5% discount if total price > LKR 50000
    if (totalPrice > 50000) {
      discount = Math.max(discount, 0.05 * totalPrice); // 5% discount
    }

    // Apply promo code discount
    if (isPromoApplied) {
      discount += 0.05 * totalPrice; // Additional 5% discount
    }

    return discount;
  };

  // Calculate total price and total number of items in the cart
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => {
    const price = parseFloat(item.price);
    return total + (isNaN(price) ? 0 : price * item.quantity);
  }, 0);

  // Calculate discount based on total price and total items
  const discount = calculateDiscount(totalPrice, totalItems);
  const finalPrice = totalPrice - discount;

  const handleQuantityChange = (itemId, quantity) => {
    if (quantity > 0) {
      updateCartItem(itemId, quantity);
    }
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleCheckout = () => {
    navigate('/payment', { state: { totalPrice: finalPrice } }); // Pass discounted price to payment page
  };

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  const handleApplyPromoCode = () => {
    if (promoCode === 'STANDS20') {
      setIsPromoApplied(true);
    } else {
      alert('Invalid promo code');
      setIsPromoApplied(false);
    }
  };

  // Format price to LKR
  const formatPrice = (price) => {
    const numberPrice = parseFloat(price);
    return `LKR ${isNaN(numberPrice) ? 'N/A' : numberPrice.toFixed(2)}`;
  };

  return (
    <>
      <Nav /> {/* Navigation bar */}
      <div className="cart-container">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            <ul className="cart-list">
              {cart.map((item) => (
                <li key={item.id} className="cart-item">
                  <img
                    src={`http://localhost:5001/files/${item.image}`}
                    alt={item.name || 'Item Name'}
                    onError={(e) => {
                      e.target.src = 'fallback-image-url.jpg';
                    }} // Fallback on error
                  />
                  <div className="cart-item-details">
                    <h3>{item.name || 'Item Name'}</h3>
                    <p>Price: {formatPrice(item.price)}</p>
                    <label>
                      Quantity:
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) =>
                          handleQuantityChange(item.id, parseInt(e.target.value) || 1)
                        }
                      />
                    </label>
                    <p>Description: {item.description}</p> {/* Display description */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="remove-item-btn"
                    >
                      Remove Item
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <h3>Total Items: {totalItems}</h3>
            <h3>Total Price: {formatPrice(totalPrice)}</h3>

            {/* Display discount and final price */}
            {discount > 0 && (
              <>
                <h3>Discount Applied: {formatPrice(discount)}</h3>
                <h3>Final Price: {formatPrice(finalPrice)}</h3>
              </>
            )}

            {/* Promo Code Section */}
            <div className="promo-code-container">
              <input
                type="text"
                value={promoCode}
                onChange={handlePromoCodeChange}
                placeholder="Enter Promo Code"
                className="promo-code-input"
              />
              <button onClick={handleApplyPromoCode} className="apply-promo-btn">
                Apply
              </button>
            </div>

            <div className="button-container">
              <button onClick={handleClearCart} className="clear-cart-btn">Clear Cart</button>
              <button onClick={handleCheckout} className="checkout-btn">Checkout</button>
            </div>
          </div>
        )}

        {/* Add photo at the bottom of the cart */}
        <div className="cart-footer-image">
          <img
            src={`${process.env.PUBLIC_URL}/Homeimages/Banner.png`} // Correct path
            alt="Promotional Banner"
            className="footer-image"
          />
        </div>
      </div>
    </>
  );
}

export default Cart;
