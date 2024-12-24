const CartModel = require('../model/CartModel'); // Assuming you have a Cart model

class CartController {
    static async getCart(req, res) {
        const { userId } = req.params;
        try {
            const cart = await CartModel.findOne({ userId });
            res.json({ status: 'ok', data: cart.items || [] });
        } catch (error) {
            res.status(500).json({ status: 'error', message: 'Error fetching cart' });
        }
    }

    static async updateCart(req, res) {
        const { userId } = req.params;
        const { itemId, quantity } = req.body;

        try {
            let cart = await CartModel.findOne({ userId });

            if (!cart) {
                cart = new CartModel({ userId, items: [] });
            }

            const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);

            if (itemIndex > -1) {
                // Update existing item quantity
                cart.items[itemIndex].quantity = quantity;
            } else {
                // Add new item
                cart.items.push({ _id: itemId, quantity });
            }

            await cart.save();
            res.json({ status: 'ok', data: cart.items });
        } catch (error) {
            res.status(500).json({ status: 'error', message: 'Error updating cart' });
        }
    }

    static async clearCart(req, res) {
        const { userId } = req.params;
        try {
            await CartModel.deleteOne({ userId });
            res.json({ status: 'ok', message: 'Cart cleared' });
        } catch (error) {
            res.status(500).json({ status: 'error', message: 'Error clearing cart' });
        }
    }
}

module.exports = CartController;
