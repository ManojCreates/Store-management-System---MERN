import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import './UpdateAdminMaintenance.css';

function UpdateAdminMaintenance() {
  const location = useLocation();
  const { adminMaintenance } = location.state;  // Destructure the passed data

  const [inputs, setInputs] = useState({
    name: '',
    contactNumber: '',
    address: '',
    typeofservice: '',
    glasstype: '',
    size: '',
    issueDescription: '',
    requeststatus: 'Pending', // Default request status is "Pending"
    assignedtechnician: [],
    scheduleddate: '',
  });

  const navigate = useNavigate();

  // Populate inputs with existing data when the component is mounted
  useEffect(() => {
    if (adminMaintenance) {
      setInputs({
        name: adminMaintenance.name,
        contactNumber: adminMaintenance.contactNumber,
        address: adminMaintenance.address,
        typeofservice: adminMaintenance.typeofservice,
        glasstype: adminMaintenance.glasstype,
        size: adminMaintenance.size,
        issueDescription: adminMaintenance.issueDescription,
        requeststatus: adminMaintenance.requeststatus || 'Pending',
        assignedtechnician: adminMaintenance.assignedtechnician || [], // Ensure assigned technicians are loaded properly
        scheduleddate: adminMaintenance.scheduleddate ? adminMaintenance.scheduleddate.split("T")[0] : '', // Format date if necessary
      });
    }
  }, [adminMaintenance]);

  const sendRequest = async () => {
    const formattedDate = inputs.scheduleddate ? inputs.scheduleddate : null;
    await axios
      .put(`http://localhost:5001/adminMaintenances/${adminMaintenance._id}`, {
        name: String(inputs.name),
        contactNumber: String(inputs.contactNumber),
        address: String(inputs.address),
        typeofservice: String(inputs.typeofservice),
        glasstype: String(inputs.glasstype),
        size: String(inputs.size),
        issueDescription: String(inputs.issueDescription),
        requeststatus: String(inputs.requeststatus),
        assignedtechnician: inputs.assignedtechnician, // Send updated assigned technicians
        scheduleddate: formattedDate,
      })
      .then((res) => res.data);
  };

  // Handle changes in the input fields
  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "assignedtechnician") {
      let updatedTechnician;

      // If the checkbox is checked, add the technician to the array
      if (checked) {
        updatedTechnician = [...inputs.assignedtechnician, value];
      } else {
        // If unchecked, remove the technician from the array
        updatedTechnician = inputs.assignedtechnician.filter((technician) => technician !== value);
      }

      setInputs((prevState) => ({
        ...prevState,
        assignedtechnician: updatedTechnician,
      }));
    } else {
      setInputs((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Handle form submission and send updated data to the backend
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => navigate("/adminmaintenancedetails"));
  };

  return (
    <div>
      <h1>Update Admin Maintenance</h1>
      <form onSubmit={handleSubmit}>
        <label>Customer Name</label>
        <br />
        <input type="text" name="name" onChange={handleChange} value={inputs.name || ''} required />
        <br /><br />
        <label>Contact Number</label>
        <br />
        <input type="text" name="contactNumber" onChange={handleChange} value={inputs.contactNumber || ''} required />
        <br /><br />
        <label>Address</label>
        <br />
        <input type="text" name="address" onChange={handleChange} value={inputs.address || ''} required />
        <br /><br />
        <label>Type of Service</label>
        <br />
        <input type="text" name="typeofservice" onChange={handleChange} value={inputs.typeofservice || ''} required />
        <br /><br />
        <label>Glass Type</label>
        <br />
        <input type="text" name="glasstype" onChange={handleChange} value={inputs.glasstype || ''} required />
        <br /><br />
        <label>Size</label>
        <br />
        <input type="text" name="size" onChange={handleChange} value={inputs.size || ''} required />
        <br /><br />
        <label>Issue Description</label>
        <br />
        <input type="text" name="issueDescription" onChange={handleChange} value={inputs.issueDescription || ''} required />
        <br /><br />
        <label>Request Status</label>
        <br />
        <input type="radio" name="requeststatus" value="Pending" checked={inputs.requeststatus === "Pending"} onChange={handleChange} />Pending &nbsp;&nbsp;
        <input type="radio" name="requeststatus" value="In Progress" checked={inputs.requeststatus === "In Progress"} onChange={handleChange} />In Progress &nbsp;&nbsp;
        <input type="radio" name="requeststatus" value="Completed" checked={inputs.requeststatus === "Completed"} onChange={handleChange} />Completed &nbsp;&nbsp;
        <input type="radio" name="requeststatus" value="Canceled" checked={inputs.requeststatus === "Canceled"} onChange={handleChange} />Canceled
        <br /><br />
        <label>Technicians</label>
        <br />
        <input
          type="checkbox"
          name="assignedtechnician"
          value="Kamal Perera"
          checked={inputs.assignedtechnician.includes("Kamal Perera")} // Ensure only Kamal Perera is checked if already assigned
          onChange={handleChange}
        />
        Kamal Perera <br />
        <input
          type="checkbox"
          name="assignedtechnician"
          value="Nimal Perera"
          checked={inputs.assignedtechnician.includes("Nimal Perera")} // Ensure Nimal Perera is checked if already assigned
          onChange={handleChange}
        />
        Nimal Perera <br />
        <input
          type="checkbox"
          name="assignedtechnician"
          value="Amal Perera"
          checked={inputs.assignedtechnician.includes("Amal Perera")} // Ensure Amal Perera is checked if already assigned
          onChange={handleChange}
        />
        Amal Perera
        <br /><br />
        <label>Scheduled Date</label>
        <br />
        <input type="date" name="scheduleddate" value={inputs.scheduleddate || ''} onChange={handleChange} />
        <br /><br />
        <button type="submit">Update Maintenance</button>
      </form>
    </div>
  );
}

export default UpdateAdminMaintenance;
