import React from 'react';
import './Product.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Product(props) {
  // Destructure the product properties from the props
  const { _id, productname, productdescription, productinventory, productprice, productsize, image } = props.product;

  const history = useNavigate();

  // Delete product handler
  const deleteHandler = async () => {
    await axios.delete(`http://localhost:5001/products/${_id}`)
      .then(res => res.data)
      .then(() => history("/"))
      .then(() => history("/productdetails"));
  };

  return (
    <div className="admin-product-card">
      {/* Display product image if available */}
      {image && (
        <img
          src={`http://localhost:5001/files/${image}`}
          alt={productname}
          className="admin-product-image"
        />
      )}
      <h2 className="admin-product-name">Product Name: {productname}</h2>
      <p className="admin-product-description">Product Description: {productdescription}</p>
      
      {/* Display Product Size */}
      <h3 className="admin-product-specifications">Product Specifications: {productsize}</h3>
      
      {/* Conditionally apply the 'low-inventory' class and show a message */}
      <h3 className={`admin-product-inventory ${productinventory < 5 ? 'low-inventory' : ''}`}>
        Product Inventory: {productinventory}
      </h3>

      {/* Display a warning message if inventory is low */}
      {productinventory < 5 && (
        <p className="admin-low-inventory-message">⚠️ Warning: Inventory is low, only {productinventory} left!</p>
      )}

      <h3 className="admin-product-price">Product Price (each): RS {productprice}</h3>

      {/* Update and Delete buttons */}
      <Link to={`/productdetails/${_id}`} state={{ product: props.product }}>
        <button className="admin-update-button">Update</button>
      </Link>
      <button className="admin-delete-button" onClick={deleteHandler}>Delete</button>
      <br />
    </div>
  );
}

export default Product;
