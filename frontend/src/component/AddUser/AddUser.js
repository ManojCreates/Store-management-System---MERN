import React, { useState } from 'react';
import Nav from '../nav/customernav';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './AddUser.css'; // Import the CSS file

function AddUser() {
    const history = useNavigate();
    const [inputs, setInputs] = useState({
        name: "",
        age: "",
        NIC: "",
        email: "",
        address: "",
        mobile: "",
        CreatePassword: "",
        ConfirmPassword: "" // Added confirmPassword
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'mobile') {
            // Only allow digits and limit to 10 characters
            const formattedValue = value.replace(/\D/g, '').slice(0, 10);
            setInputs((prevState) => ({
                ...prevState,
                mobile: formattedValue,
            }));
        } else {
            setInputs((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleNameChange = (e) => {
        const value = e.target.value;
        const filteredValue = value.replace(/[^A-Za-z\s]/g, ''); // Only allow letters and spaces

        setInputs((prevState) => ({
            ...prevState,
            name: filteredValue,
        }));
    };

    const handleNICChange = (e) => {
        let value = e.target.value;

        // Allow NIC format: Either 9 digits + V/v or 12 digits
        const oldNICPattern = /^[0-9]{0,9}[vV]?$/; // Matches up to 9 digits followed by optional 'v' or 'V'
        const newNICPattern = /^[0-9]{0,12}$/; // Matches up to 12 digits

        // Check if the input matches either of the two patterns
        if (oldNICPattern.test(value) || newNICPattern.test(value)) {
            setInputs((prevState) => ({
                ...prevState,
                NIC: value,
            }));
        }
    };

    const validateInputs = () => {
        // Validate Age
        if (inputs.age < 18) {
            setError("You must be 18 years or older to register.");
            return false;
        }

        const NICPattern = /^(?:\d{9}[vV]|\d{12})$/; // For both old (9 digits + V) and new NIC (12 digits)
        if (!NICPattern.test(inputs.NIC)) {
            setError("NIC must be valid (e.g., 123456789V or 200012345678).");
            return false;
        }

        // Validate Email
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Basic email pattern
        if (!emailPattern.test(inputs.email)) {
            setError("Email must be valid.");
            return false;
        }

        // Check if address is provided
        if (!inputs.address) {
            setError("Address is required.");
            return false;
        }

        // Validate Passwords
        if (inputs.CreatePassword !== inputs.ConfirmPassword) {
            setError("Passwords do not match.");
            return false;
        }

        setError(""); // Clear error if all validations passed
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateInputs()) {
            console.log(inputs);
            sendRequest().then(() => history("/userdetails"));
        }
    };

    const sendRequest = async () => {
        await axios.post("http://localhost:5001/users", {
            name: String(inputs.name),
            age: Number(inputs.age),
            NIC: String(inputs.NIC),  // NIC treated as a string
            email: String(inputs.email),
            address: String(inputs.address),
            mobile: String(inputs.mobile),
            CreatePassword:String(inputs.CreatePassword),
            ConfirmPassword:String(inputs.ConfirmPassword), // Include password in the request
        }).then(res => res.data);
    };

    return (
        <div>
            <Nav />
            <h1>Register</h1>
            {error && <div id="error-message">{error}</div>} {/* Display error message */}
            <form onSubmit={handleSubmit}>
                <label htmlFor="name-input">Name</label>
                <br />
                <input
                    type="text"
                    id="name-input" // Unique ID
                    name="name"
                    onChange={handleNameChange}
                    value={inputs.name}
                    required
                />
                <br /><br />

                <label htmlFor="age-input">Age</label>
                <br />
                <input
                    type="number"
                    id="age-input" // Unique ID
                    name="age"
                    onChange={handleChange}
                    value={inputs.age}
                    required
                />
                <br /><br />

                <label htmlFor="NIC-input">NIC</label>
                <br />
                <input
                    type="text"
                    id="NIC-input" // Unique ID
                    name="NIC"
                    onChange={handleNICChange} // Updated NIC handler
                    value={inputs.NIC}
                    required
                />
                <br /><br />

                <label htmlFor="email-input">Email</label>
                <br />
                <input
                    type="email"
                    id="email-input" // Unique ID
                    name="email"
                    onChange={handleChange}
                    value={inputs.email}
                    required
                />
                <br /><br />

                <label htmlFor="address-input">Address</label>
                <br />
                <input
                    type="text"
                    id="address-input" // Unique ID
                    name="address"
                    onChange={handleChange}
                    value={inputs.address}
                    required
                />
                <br /><br />

                <label htmlFor="mobile-input">Mobile Number</label>
                <br />
                <input
                    type="tel"
                    id="mobile-input" // Unique ID
                    name="mobile"
                    onChange={handleChange}
                    value={inputs.mobile}
                    required
                />
                <br /><br />

                <label htmlFor="CreatePassword">Create Password</label>
                <br />
                <input
                    type="password" // Corrected input type
                    id="password-input" // Unique ID
                    name="CreatePassword" // Update name to "password"
                    onChange={handleChange}
                    value={inputs.CreatePassword}
                    required
                />
                <br /><br />

                <label htmlFor="ConfirmPassword">Confirm Password</label>
                <br />
                <input
                    type="password" // Corrected input type
                    id="confirm-password-input" // Unique ID
                    name="ConfirmPassword" // Update name to "confirmPassword"
                    onChange={handleChange}
                    value={inputs.ConfirmPassword}
                    required
                />
                <br /><br />

                <button type="submit" disabled={inputs.age < 18}>Submit</button> {/* Disable if age < 18 */}
            </form>
        </div>
    );
}

export default AddUser;
