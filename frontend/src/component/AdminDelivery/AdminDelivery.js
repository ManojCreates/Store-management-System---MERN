import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminDelivery.css'; // Import the CSS file

function AdminDelivery(props) {
  const { 
    _id, 
    requestid, 
    name, 
    contactNumber, 
    address, 
    glasstypeandsize, 
    quantity, 
    specialInstructions, 
    deliverystatus, 
    assigneddriver, 
    deliverydate 
  } = props.adminDelivery;

  const history = useNavigate();

  const deleteHandler = async () => {
    await axios.delete(`http://localhost:5001/adminDeliveries/${_id}`)
      .then(res => res.data)
      .then(() => history("/"))
      .then(() => history("/admindeliverydetails"));
  };

  return (
    <div className="yy-admin-delivery-container">
      <h1 className="yy-delivery-title">LANKA GLASS HOUSE Delivery Report</h1>
      <p><strong className="yy-label">Request ID:</strong> <span className="yy-request-id">{requestid}</span></p>
      <p><strong className="yy-label">Name:</strong> <span className="yy-name">{name}</span></p>
      <p><strong className="yy-label">Contact Number:</strong> <span className="yy-contact-number">{contactNumber}</span></p>
      <p><strong className="yy-label">Address:</strong> <span className="yy-address">{address}</span></p>
      <p><strong className="yy-label">Glass Type & Size:</strong> <span className="yy-glass-type">{glasstypeandsize}</span></p>
      <p><strong className="yy-label">Quantity:</strong> <span className="yy-quantity">{quantity}</span></p>
      <p><strong className="yy-label">Special Instruction:</strong> <span className="yy-special-instruction">{specialInstructions}</span></p>
      <p><strong className="yy-label">Delivery Status:</strong> <span className="yy-delivery-status">{deliverystatus}</span></p>
      <p><strong className="yy-label">Assigned Driver:</strong> <span className="yy-assigned-driver">{assigneddriver.join(", ")}</span></p>
      <p><strong className="yy-label">Delivery Date:</strong> <span className="yy-delivery-date">{deliverydate.split("T")[0]}</span></p> {/* Format date to remove time */}

      <div className="yy-button-container">
        <Link
          className="yy-link-button"
          to={`/adminDeliveries/${_id}`}
          state={{
            _id,
            requestid,
            name,
            contactNumber,
            address,
            glasstypeandsize,
            quantity,
            specialInstructions,
            deliverystatus,
            assigneddriver,
            deliverydate,
          }}
        >
          Update
        </Link>
        <button className="yy-btn-delete" onClick={deleteHandler}>Delete</button>
      </div>
      <div className="yy-separator"></div>
    </div>
  );
}

export default AdminDelivery;
