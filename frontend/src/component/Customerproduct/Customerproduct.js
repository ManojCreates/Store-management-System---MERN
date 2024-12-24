import React, { useState } from 'react';
import { useCart } from '../../CartContext';
import './customerProduct.css';

function CustomerProduct({ product }) {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleAddToCart = () => {
        const item = {
            id: product._id,
            name: product.productname,
            price: product.productprice,
            quantity: quantity,
            image: product.image,
            description: product.productdescription,
        };

        addToCart(item);
        alert(`${product.productname} added to cart successfully!`);
    };

    return (
        <div className="product-card">
            <img 
                className="product-image" 
                src={`http://localhost:5001/files/${product.image}`} 
                alt={product.productname} 
            />
            <h1 className="product-name">{product.productname}</h1>
            <p className="product-description">{product.productdescription}</p>
            <p className="product-size">Size: {product.productsize}</p>
            <p className="product-price">Price: RS {product.productprice}</p>
            <div className="quantity-selector">
                <label htmlFor={`quantity-${product._id}`}>Quantity:</label>
                <input
                    id={`quantity-${product._id}`}
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, e.target.value))}
                    min="1"
                />
            </div>
            <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
}

export default CustomerProduct;
