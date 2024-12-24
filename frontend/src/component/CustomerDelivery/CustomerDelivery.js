import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './CustomerDelivery.css'; // Import the CSS file

function CustomerDelivery(props) {
  const {_id, name, contactNumber, email, address, glassType, quantity, specialInstructions, preferredDeliveryDate} = props.customerDelivery;

  const history = useNavigate();

  // Delete handler function
  const deleteHandler = async () => {
    await axios.delete(`http://localhost:5001/customerDeliveries/${_id}`)
      .then(res => res.data)
      .then(() => history("/"))
      .then(() => history("/customerdeliverydetails"));
  };

  // Format the preferredDeliveryDate to show only the date (YYYY-MM-DD)
  const formattedDeliveryDate = new Date(preferredDeliveryDate).toISOString().slice(0, 10);

  return (
    <div className="cc-customer-delivery-container">
      <h1>LANKA GLASS HOUSE Delivery Report</h1>
      <p className="cc-name"><strong>Name:</strong> {name}</p>
      <p className="cc-contact-number"><strong>Contact Number:</strong> {contactNumber}</p>
      <p className="cc-email"><strong>Email:</strong> {email}</p>
      <p className="cc-address"><strong>Address:</strong> {address}</p>
      <p className="cc-glass-type"><strong>Glass Type:</strong> {glassType.join(", ")}</p>
      <p className="cc-quantity"><strong>Quantity:</strong> {quantity}</p>
      <p className="cc-special-instruction"><strong>Special Instruction:</strong> {specialInstructions}</p>
      <p className="cc-preferred-delivery-date"><strong>Preferred Delivery Date:</strong> {formattedDeliveryDate}</p>

      {/* Buttons styled as per CSS */}
      <div className="cc-button-container">
        <button className="cc-btn-delete" onClick={deleteHandler}>Delete</button>
        <Link
          className="cc-link-button"
          to={`/addadminDelivery/${_id}`}
          state={{
            name: name,
            contactNumber: contactNumber,
            address: address,
            glassType: glassType.join(", "),
            quantity: quantity,
            specialInstructions: specialInstructions,
            preferredDeliveryDate: formattedDeliveryDate,
          }}
        >
          Assign Drivers
        </Link>
      </div>

      {/* Separator for visual spacing */}
      <div className="cc-separator"></div>
    </div>
  );
}

export default CustomerDelivery;
