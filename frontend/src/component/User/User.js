import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './user.css'; // Import the CSS file

function User(props) {
  const { _id, name, age, NIC, email, address, mobile } = props.user; // Removed password fields from destructuring

  const navigate = useNavigate();
  
  const deleteHandler = async () => {
    try {
      await axios.delete(`http://localhost:5001/users/${_id}`);
      navigate("/userdetails"); // Navigate to user details after deletion
    } catch (error) {
      console.error("Error deleting user:", error); // Handle error if needed
    }
  };

  return (
    <div className="user-container">
      <h1 className="user-title">Profile</h1>
      <div className="user-card">
        <div className="user-info">
          <h2>Name: {name}</h2>
          <h2>Age: {age}</h2>
          <h2>NIC: {NIC}</h2>
          <h2>Email: {email}</h2>
          <h2>Address: {address}</h2>
          <h2>Mobile: {mobile}</h2>
        </div>
        <div className="button-container">
          <Link to={`/updateuser/${_id}`} className="link-button">Update</Link>
          <button onClick={deleteHandler} className="delete-button">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default User;
