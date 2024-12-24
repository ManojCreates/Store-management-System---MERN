const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');

// Get cart items for a user
router.get('/:userId', CartController.getCart);

// Add/update items in the cart
router.post('/:userId', CartController.updateCart);

// Clear the cart
router.delete('/:userId', CartController.clearCart);

module.exports = router;
