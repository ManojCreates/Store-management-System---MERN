// models/cartModel.js
const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  items: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, default: 1 },
      image: { type: String } // Store the image path if needed
    }
  ]
});

const CartModel = mongoose.model('Cart', CartSchema);

module.exports = CartModel;
