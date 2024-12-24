import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './CustomerMaintenance.css'; // Import the CSS file

function CustomerMaintenance(props) {
  const { _id, name, contactNumber, email, address, serviceType, glassType, dimensions, issueDescription, preferredServiceDate } = props.customerMaintenance;

  const history = useNavigate();

  const deleteHandler = async () => {
    await axios.delete(`http://localhost:5001/customerMaintenances/${_id}`)
    .then(res => res.data)
    .then(() => {
        alert("Delete Successful");  // Show success popup
        history("/");  // Redirect to home or another page
        history("/customerMaintenanceDetails");  // Refresh the details page
    });
  };

  // Format the preferred service date to only show the date portion
  const formattedPreferredServiceDate = new Date(preferredServiceDate).toLocaleDateString();

  return (
    <div className="customer-maintenance-container">
        <h1>LANKA GLASS HOUSE Maintenance Report</h1>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Contact Number:</strong> {contactNumber}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Address:</strong> {address}</p>
        <p><strong>Service Type:</strong> {serviceType}</p>
        <p><strong>Glass Type:</strong> {glassType.join(", ")}</p>
        <p><strong>Dimensions:</strong> {dimensions}</p>
        <p><strong>Issue Description:</strong> {issueDescription}</p>
        <p><strong>Preferred Service Date:</strong> {formattedPreferredServiceDate}</p>

        {/* Buttons are displayed normally but hidden in print mode */}
        <div className="button-container">
            <button className="btn-delete" onClick={deleteHandler}>Delete</button>
            <Link
            className="link-button"
            to={`/addadminMaintenance/${_id}`}
            state={{
            name: name,
            contactNumber: contactNumber,
            address: address,
            serviceType: serviceType,
            glassType: glassType.join(", "),
            issueDescription: issueDescription,
            dimensions: dimensions,
            }}
            >
            Assign Technicians
            </Link>
        </div>

        {/* Separator for visual spacing */}
        <div className="separator"></div>
    </div>
  );
}

export default CustomerMaintenance;
