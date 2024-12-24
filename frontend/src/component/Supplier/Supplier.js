import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router";
import axios from 'axios';
import './Supplier.css'; 

function Supplier(props) {
  const { _id, SupplierName,ContactPerson, SupplierEmail, SupplierPhoneNumber, SupplierAddress, SupplierProducts, SupplierRating } = props.supplier;

  const history = useNavigate();

  const deleteHandler = async () => {
    await axios.delete(`http://localhost:5001/suppliers/${_id}`)
      .then(res => res.data)
      .then(() => history("/")) // Redirect after deletion
      .then(() => history("/supplierdetails")); // Reload supplier details page
  }

  return (
    <div className="supplier-container">
      <h1 id="supplier-title">Supplier Display</h1>
      <table id="supplier-table">
        <tbody>
          <tr>
            <td id="supplier-name-label">Supplier Name:</td>
            <td id="supplier-name">{SupplierName}</td>
          </tr>
          <tr>
            <td id="contact-person-label">Contact Person:</td>
            <td id="contact-person">{ContactPerson}</td>
          </tr>
          <tr>
            <td id="supplier-email-label">Supplier Email:</td>
            <td id="supplier-email">{SupplierEmail}</td>
          </tr>
          <tr>
            <td id="supplier-phone-label">Supplier Phone Number:</td>
            <td id="supplier-phone">{SupplierPhoneNumber}</td>
          </tr>
          <tr>
            <td id="supplier-address-label">Supplier Address:</td>
            <td id="supplier-address">{SupplierAddress}</td>
          </tr>
          <tr>
            <td id="supplier-products-label">Supplier Products:</td>
            <td id="supplier-products">{SupplierProducts}</td>
          </tr>
          <tr>
            <td id="supplier-rating-label">Supplier Rating:</td>
            <td id="supplier-rating">{SupplierRating}</td>
          </tr>
        </tbody>
      </table>

      {/* Conditionally render Update and Delete buttons with no-print class */}
      <Link
        to={`/supplierdetails/${_id}`} 
        state={{ supplier: props.supplier }} 
        className="link no-print" // Add no-print class
        id="update-link"
      >
        Update
      </Link>

      <button className="button no-print" id="delete-button" onClick={deleteHandler}>
        Delete
      </button>
    </div>
  );
}

export default Supplier;
