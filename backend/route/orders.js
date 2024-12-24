const express = require('express');
const { authenticateUser } = require('../middleware/auth');
const { getOrders, cancelOrder, updateOrderAddress } = require('../controllers/orderController');

const router = express.Router();

router.get('/', authenticateUser, getOrders);
router.delete('/:id/cancel', authenticateUser, cancelOrder);
router.put('/:id/update', authenticateUser, updateOrderAddress);

module.exports = router;
