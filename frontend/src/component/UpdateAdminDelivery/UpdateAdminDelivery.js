import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import './UpdateAdminDelivery.css';

function UpdateAdminDelivery() {
  const [inputs, setInputs] = useState({
    name: '',
    contactNumber: '',
    address: '',
    glasstypeandsize: '',
    quantity: '',
    specialInstructions: '',
    deliverystatus: '',
    assigneddriver: [], // Default to an empty array
    deliverydate: '', // Initialize date as an empty string
  });
  
  const history = useNavigate();
  const { id } = useParams();
  const location = useLocation(); // Access the passed state

  useEffect(() => {
    if (location.state) {
      // Pre-fill form with passed data from AdminDelivery
      const data = location.state;
      setInputs({
        name: data.name || '',
        contactNumber: data.contactNumber || '',
        address: data.address || '',
        glasstypeandsize: data.glasstypeandsize || '',
        quantity: data.quantity || '', 
        specialInstructions: data.specialInstructions || '',
        deliverystatus: data.deliverystatus || '',
        assigneddriver: data.assigneddriver || [],
        deliverydate: data.deliverydate.split("T")[0] || '',
      });
    } else {
      // Fallback to fetching data if state is not available
      const fetchHandler = async () => {
        try {
          const res = await axios.get(`http://localhost:5001/adminDeliveries/${id}`);
          const data = res.data.adminDeliveries;
          setInputs({
            name: data.name || '',
            contactNumber: data.contactNumber || '',
            address: data.address || '',
            glasstypeandsize: data.glasstypeandsize || '',
            quantity: data.quantity || '', 
            specialInstructions: data.specialInstructions || '',
            deliverystatus: data.deliverystatus || '',
            assigneddriver: data.assigneddriver || [],
            deliverydate: data.deliverydate.split("T")[0] || '',
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchHandler();
    }
  }, [id, location]);

  const sendRequest = async () => {
    try {
      await axios.put(`http://localhost:5001/adminDeliveries/${id}`, {
        name: String(inputs.name),
        contactNumber: String(inputs.contactNumber),
        address: String(inputs.address),
        glasstypeandsize: String(inputs.glasstypeandsize),
        quantity: Number(inputs.quantity),
        specialInstructions: String(inputs.specialInstructions),
        deliverystatus: String(inputs.deliverystatus),
        assigneddriver: inputs.assigneddriver, 
        deliverydate: inputs.deliverydate, // No need to cast as Date, input will provide correct format
      });
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "assigneddriver") {
      let updatedDriver = [...inputs.assigneddriver];

      if (checked) {
        updatedDriver.push(value);
      } else {
        updatedDriver = updatedDriver.filter((item) => item !== value);
      }

      setInputs((prevState) => ({
        ...prevState,
        assigneddriver: updatedDriver,
      }));
    } else {
      setInputs((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => history("/admindeliverydetails"));
  };

  return (
    <div>
      <h1>Update Admin Delivery</h1>
      <form onSubmit={handleSubmit}>
        <label>Customer Name</label>
        <br />
        <input type="text" name="name" onChange={handleChange} value={inputs.name} required />
        <br /><br />
        <label>Contact Number</label>
        <br />
        <input type="phone" name="contactNumber" onChange={handleChange} value={inputs.contactNumber} required />
        <br /><br />
        <label>Address</label>
        <br />
        <input type="text" name="address" onChange={handleChange} value={inputs.address} required />
        <br /><br />
        <label>Glass Type & Size</label>
        <br />
        <input type="text" name="glasstypeandsize" onChange={handleChange} value={inputs.glasstypeandsize} required />
        <br /><br />
        <label>Quantity</label>
        <br />
        <input type="number" name="quantity" onChange={handleChange} value={inputs.quantity} required />
        <br /><br />
        <label>Special Instructions</label>
        <br />
        <input type="text" name="specialInstructions" onChange={handleChange} value={inputs.specialInstructions} required />
        <br /><br />
        <label>Delivery Status</label>
        <br />
        <input type="radio" name="deliverystatus" value="Pending" checked={inputs.deliverystatus === "Pending"} onChange={handleChange} />Pending &nbsp;&nbsp;
        <input type="radio" name="deliverystatus" value="In Progress" checked={inputs.deliverystatus === "In Progress"} onChange={handleChange} />In Progress &nbsp;&nbsp;
        <input type="radio" name="deliverystatus" value="Completed" checked={inputs.deliverystatus === "Completed"} onChange={handleChange} />Completed &nbsp;&nbsp;
        <input type="radio" name="deliverystatus" value="Canceled" checked={inputs.deliverystatus === "Canceled"} onChange={handleChange} />Canceled
        <br /><br />
        <label>Drivers</label>
        <br />
        <input type="checkbox" name="assigneddriver" value="Kamal Perera" checked={inputs.assigneddriver.includes("Kamal Perera")} onChange={handleChange} />Kamal Perera <br />
        <input type="checkbox" name="assigneddriver" value="Nimal Perera" checked={inputs.assigneddriver.includes("Nimal Perera")} onChange={handleChange} />Nimal Perera <br />
        <input type="checkbox" name="assigneddriver" value="Amal Perera" checked={inputs.assigneddriver.includes("Amal Perera")} onChange={handleChange} />Amal Perera
        <br /><br />
        <label>Delivery Date</label>
        <br />
        <input type="date" name="deliverydate" onChange={handleChange} value={inputs.deliverydate} required />
        <br /><br />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default UpdateAdminDelivery;
