import React, { useState } from 'react';
import Nav from "../nav/nav";
import { useNavigate } from "react-router";
import axios from 'axios';
import './AddSupplier.css';

function AddSupplier() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    SupplierName: '',
    ContactPerson: '',
    SupplierEmail: '',
    SupplierPhoneNumber: '',
    SupplierAddress: '',
    SupplierProducts: '',
    SupplierRating: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation logic for input restrictions
    let filteredValue = value;

    switch (name) {
      case 'SupplierName':
      case 'ContactPerson':
        filteredValue = value.replace(/[^A-Za-z\s]/g, ''); // Only letters and spaces
        break;
      case 'SupplierPhoneNumber':
        filteredValue = value.replace(/[^0-9]/g, ''); // Only numbers
        if (filteredValue.length > 10) filteredValue = filteredValue.slice(0, 10); // Limit to 10 digits
        if (filteredValue.length > 0 && filteredValue[0] !== '0') filteredValue = ''; // Must start with 0
        break;
      case 'SupplierProducts':
      case 'SupplierRating':
        filteredValue = value.replace(/[0-9]/g, ''); // No numbers
        break;
      default:
        break;
    }

    setInputs((prevState) => ({
      ...prevState,
      [name]: filteredValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendRequest();
    history("/supplierdetails");
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:5001/suppliers", {
      SupplierName: String(inputs.SupplierName),
      ContactPerson: String(inputs.ContactPerson),
      SupplierEmail: String(inputs.SupplierEmail),
      SupplierPhoneNumber: String(inputs.SupplierPhoneNumber),
      SupplierAddress: String(inputs.SupplierAddress),
      SupplierProducts: String(inputs.SupplierProducts),
      SupplierRating: String(inputs.SupplierRating),
    });
  };

  return (
    <div>
      <Nav />
      <h1>Add Supplier</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="supplierName">Supplier Name</label>
        <input type="text" id="supplierName" name="SupplierName" onChange={handleChange} value={inputs.SupplierName} required />

        <label htmlFor="contactPerson">Contact Person</label>
        <input type="text" id="contactPerson" name="ContactPerson" onChange={handleChange} value={inputs.ContactPerson} required />

        <label htmlFor="supplierEmail">Supplier Email</label>
        <input type="email" id="supplierEmail" name="SupplierEmail" onChange={handleChange} value={inputs.SupplierEmail} required />

        <label htmlFor="supplierPhoneNumber">Supplier Phone Number</label>
        <input type="text" id="supplierPhoneNumber" name="SupplierPhoneNumber" onChange={handleChange} value={inputs.SupplierPhoneNumber} required />

        <label htmlFor="supplierAddress">Supplier Address</label>
        <input type="text" id="supplierAddress" name="SupplierAddress" onChange={handleChange} value={inputs.SupplierAddress} required />

        <label htmlFor="supplierProducts">Supplier Products</label>
        <input type="text" id="supplierProducts" name="SupplierProducts" onChange={handleChange} value={inputs.SupplierProducts} required />

        <label htmlFor="supplierRating">Supplier Rating</label>
        <input type="text" id="supplierRating" name="SupplierRating" onChange={handleChange} value={inputs.SupplierRating} required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddSupplier;
