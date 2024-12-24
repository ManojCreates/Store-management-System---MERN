import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './AdminMaintenance.css';

function AdminMaintenance(props) {
  const { _id, requestid, name, contactNumber, address, typeofservice, glasstype, size, issueDescription, requeststatus, assignedtechnician, scheduleddate } = props.adminMaintenance;

  const navigate = useNavigate();

  const deleteHandler = async () => {
    await axios.delete(`http://localhost:5001/adminMaintenances/${_id}`)
      .then(res => res.data)
      .then(() => navigate("/"))
      .then(() => navigate("/adminmaintenancedetails"));
  };

  const handleUpdateClick = () => {
    navigate(`/adminMaintenances/${_id}`, {
      state: {
        adminMaintenance: {
          _id, requestid, name, contactNumber, address, typeofservice, glasstype, size, issueDescription, requeststatus, assignedtechnician, scheduleddate
        }
      }
    });
  };

  return (
    <div className="admin-maintenance-container">
      <h1>LANKA GLASS HOUSE Maintenance Report</h1>
      <p><strong>Request ID:</strong> {requestid}</p>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Contact Number:</strong> {contactNumber}</p>
      <p><strong>Address:</strong> {address}</p>
      <p><strong>Type of Service:</strong> {typeofservice}</p>
      <p><strong>Glass Type:</strong> {glasstype}</p>
      <p><strong>Size:</strong> {size}</p>
      <p><strong>Issue Description:</strong> {issueDescription}</p>
      <p><strong>Request Status:</strong> {requeststatus}</p>

      {/* Render only selected technicians without any defaults */}
      <p><strong>Assigned Technician:</strong> 
        {assignedtechnician && assignedtechnician.length > 0 
          ? assignedtechnician.join(", ") 
          : "No Technician Assigned"}
      </p>

      <p><strong>Scheduled Date:</strong> {scheduleddate ? scheduleddate.split("T")[0] : ""}</p> {/* Ensure only date is displayed */}

      <div className="button-container">
        <button className="link-button" onClick={handleUpdateClick}>Update</button>
        <button className="btn-delete" onClick={deleteHandler}>Delete</button>
      </div>
      <div className="separator"></div>
    </div>
  );
}

export default AdminMaintenance;
