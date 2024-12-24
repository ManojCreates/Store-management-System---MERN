import React, { useEffect, useState } from 'react'; 
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function UpdateUser() {
  const [inputs, setInputs] = useState({
    name: "",
    age: "",
    NIC: "", // Add NIC field here
    email: "",
    address: "",
    mobile: "",
    createPassword: "", // Changed to camelCase
    confirmPassword: "", // Changed to camelCase
  });
  const [error, setError] = useState(""); // Error state for validation messages

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/users/${id}`);
        setInputs(response.data); // Adjust based on your API structure
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data.");
      }
    };
    fetchHandler();
  }, [id]);

  const validateInputs = () => {
    // Validate Name
    const namePattern = /^[A-Za-z\s]+$/; // Allow only letters and spaces
    if (!namePattern.test(inputs.name)) {
      setError("Name can only contain letters and spaces.");
      return false;
    }

    // Validate Age
    if (Number(inputs.age) < 18) {
      setError("You must be 18 years or older to update your information.");
      return false;
    }

    // Validate NIC (Sri Lankan NIC format)
    const nicPattern = /^(?:\d{9}[vV]|\d{12})$/; // For both old (9 digits + V) and new NIC (12 digits)
    if (!nicPattern.test(inputs.NIC)) {
      setError("NIC must be valid (e.g., 123456789V or 200012345678).");
      return false;
    }

    // Validate Mobile Number
    const mobilePattern = /^(\+94|0)?[7][0-9]{8}$/; // Sri Lankan mobile number pattern
    if (!mobilePattern.test(inputs.mobile)) {
      setError("Mobile number must be a valid Sri Lankan number.");
      return false;
    }

    // Validate Email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(inputs.email)) {
      setError("Email must be valid.");
      return false;
    }

    // Validate Address
    if (!inputs.address.trim()) {
      setError("Address is required.");
      return false;
    }

    // Validate Passwords
    if (inputs.createPassword || inputs.confirmPassword) { // Only validate if password fields are filled
      if (inputs.createPassword.length < 6) {
        setError("Password must be at least 6 characters long.");
        return false;
      }

      if (inputs.createPassword !== inputs.confirmPassword) {
        setError("Passwords do not match.");
        return false;
      }
    }

    setError(""); // Clear error if all validations pass
    return true;
  };

  const sendRequest = async () => {
    try {
      // Prepare the data to be updated
      const updateData = {
        name: String(inputs.name),
        age: Number(inputs.age),
        NIC: String(inputs.NIC),
        email: String(inputs.email),
        address: String(inputs.address),
        mobile: String(inputs.mobile),
      };

      // Include password only if it's being updated
      if (inputs.createPassword) {
        updateData.password = String(inputs.createPassword); // Changed to 'password'
      }

      await axios.put(`http://localhost:5001/users/${id}`, updateData);
    } catch (error) {
      console.error("Error updating user data:", error);
      setError("Failed to update user data.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Real-time validation for name to prevent special characters
    if (name === "name" && /[^A-Za-z\s]/.test(value)) {
      setError("Name can only contain letters and spaces.");
      return; // Prevent setting invalid value
    }

    // Real-time validation for age to ensure it is above 18
    if (name === "age" && Number(value) < 18) {
      setError("You must be 18 years or older.");
      return; // Prevent setting invalid value
    }

    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError(""); // Reset error on valid input change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      console.log(inputs);
      sendRequest().then(() => navigate("/userdetails"));
    }
  };

  return (
    <div>
      <h1>Update Your Information</h1>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>} {/* Display error message */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
          value={inputs.name}
          required
        />
        <br /><br />

        <label htmlFor="age">Age</label>
        <br />
        <input
          type="number"
          id="age"
          name="age"
          onChange={handleChange}
          value={inputs.age}
          required
        />
        <br /><br />

        <label htmlFor="NIC">NIC</label>
        <br />
        <input
          type="text"
          id="NIC"
          name="NIC"
          onChange={handleChange}
          value={inputs.NIC}
          required
        />
        <br /><br />

        <label htmlFor="email">Email</label>
        <br />
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          value={inputs.email}
          required
        />
        <br /><br />

        <label htmlFor="address">Address</label>
        <br />
        <input
          type="text"
          id="address"
          name="address"
          onChange={handleChange}
          value={inputs.address}
          required
        />
        <br /><br />

        <label htmlFor="mobile">Mobile Number</label>
        <br />
        <input
          type="tel"
          id="mobile"
          name="mobile"
          onChange={handleChange}
          value={inputs.mobile}
          required
        />
        <br /><br />

        <label htmlFor="createPassword">Create Password</label>
        <br />
        <input
          type="password"
          id="createPassword"
          name="createPassword" // Changed to camelCase
          onChange={handleChange}
          value={inputs.createPassword}
          placeholder="Enter new password"
        />
        <br /><br />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <br />
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword" // Changed to camelCase
          onChange={handleChange}
          value={inputs.confirmPassword}
          placeholder="Re-enter new password"
        />
        <br /><br />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateUser;
