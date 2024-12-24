import React, { useState } from 'react';
import Nav from '../nav/customernav';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './AddCustomerMaintenance.css';

function AddCustomerMaintenance() {
    const history = useNavigate();
    const [inputs, setInputs] = useState({
        name: "",
        contactNumber: "",
        email: "",
        address: "",
        serviceType: "Replace",
        glassType: [],
        dimensions: "",
        issueDescription: "",
        preferredServiceDate: "",
    });

    const [selectedCountryCode, setSelectedCountryCode] = useState("+94"); // Default to Sri Lanka code

    const handleGlassTypeChange = (e) => {
        const { value, checked } = e.target;

        setInputs((prevState) => {
            let updatedGlassTypes = [...prevState.glassType];

            if (checked) {
                updatedGlassTypes.push(value);
            } else {
                updatedGlassTypes = updatedGlassTypes.filter((type) => type !== value);
            }

            return {
                ...prevState,
                glassType: updatedGlassTypes,
            };
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "name") {
            const filteredValue = value.replace(/[^a-zA-Z\s]/g, '');
            const capitalizedValue = filteredValue.replace(/\b\w/g, char => char.toUpperCase());
            setInputs((prevState) => ({
                ...prevState,
                [name]: capitalizedValue,
            }));
        } else if (name === "contactNumber") {
            const numberValue = value.replace(/[^0-9]/g, '',/[^a-zA-Z\s]/g, ''); // Allow only digits
            if (numberValue.length <= 11) {
                setInputs((prevState) => ({
                    ...prevState,
                    contactNumber: numberValue,
                }));
            }
        } else {
            setInputs((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendRequest().then(() => {
            alert("Confirmation Successful");
            history("/customerhome");
        });
    };

    const sendRequest = async () => {
        const fullContactNumber = `${selectedCountryCode}${inputs.contactNumber}`;
        await axios.post("http://localhost:5001/customerMaintenances", {
            name: String(inputs.name),
            contactNumber: fullContactNumber,
            email: String(inputs.email),
            address: String(inputs.address),
            serviceType: String(inputs.serviceType),
            glassType: inputs.glassType,
            dimensions: inputs.dimensions,
            issueDescription: String(inputs.issueDescription),
            preferredServiceDate: inputs.preferredServiceDate,
        }).then(res => res.data);
    };

    return (
        <div id="unique-maintenance-form-container">
            <Nav />
            <div id="unique-maintanance-banner"></div>
            <h1 id="unique-maintenance-heading">Enter Details for Maintenance</h1>
            <form id="unique-maintenance-form" onSubmit={handleSubmit}>
                <label className="unique-form-label">Name</label>
                <input
                    type="text"
                    name="name"
                    className="unique-form-input"
                    onChange={handleChange}
                    value={inputs.name}
                    required
                />

                <label className="unique-form-label">Contact Number</label>
                <div id="unique-contact-number-wrapper">
                    <select
                        value={selectedCountryCode}
                        onChange={(e) => setSelectedCountryCode(e.target.value)}
                        className="unique-form-select"
                    >
                        <option value="+94">+94 (Sri Lanka)</option>
                        <option value="+1">+1 (USA)</option>
                        <option value="+44">+44 (UK)</option>
                    </select>
                    <input
                        type="text"
                        name="contactNumber"
                        className="unique-form-input"
                        onChange={handleChange}
                        value={inputs.contactNumber}
                        placeholder="Enter phone number"
                        required
                    />
                </div>

                <label className="unique-form-label">Email</label>
                <input
                    type="text"
                    name="email"
                    className="unique-form-input"
                    onChange={handleChange}
                    value={inputs.email}
                    required
                />

                <label className="unique-form-label">Address</label>
                <input
                    type="text"
                    name="address"
                    className="unique-form-input"
                    onChange={handleChange}
                    value={inputs.address}
                    required
                />

                <label className="unique-form-label">Service Type</label>
                <input type="radio" name="serviceType" value="Replace" checked={inputs.serviceType === "Replace"} onChange={handleChange} />Replace
                <input type="radio" name="serviceType" value="Maintenance" checked={inputs.serviceType === "Maintenance"} onChange={handleChange} />Maintenance
<br />
                <label className="unique-form-label">Glass Type</label>
                <div className="unique-checkbox-group">
                    <div className="unique-checkbox-item">
                        <input
                            type="checkbox"
                            name="glassType"
                            value="Toughned Glass"
                            className="unique-form-checkbox"
                            checked={inputs.glassType.includes("Toughned Glass")}
                            onChange={handleGlassTypeChange}
                        />
                        Toughned Glass
                    </div>
                    <div className="unique-checkbox-item">
                        <input
                            type="checkbox"
                            name="glassType"
                            value="Laminated Glass"
                            className="unique-form-checkbox"
                            checked={inputs.glassType.includes("Laminated Glass")}
                            onChange={handleGlassTypeChange}
                        />
                        Laminated Glass
                    </div>
                    <div className="unique-checkbox-item">
                        <input
                            type="checkbox"
                            name="glassType"
                            value="Mirrored Glass"
                            className="unique-form-checkbox"
                            checked={inputs.glassType.includes("Mirrored Glass")}
                            onChange={handleGlassTypeChange}
                        />
                        Mirrored Glass
                    </div>
                </div>

                <label className="unique-form-label">Dimensions</label>
                <input
                    type="text"
                    name="dimensions"
                    className="unique-form-input"
                    onChange={handleChange}
                    value={inputs.dimensions}
                />

                <label className="unique-form-label">Issue Description</label>
                <textarea
                    name="issueDescription"
                    className="unique-form-textarea"
                    onChange={handleChange}
                    value={inputs.issueDescription}
                    required
                />

                <label className="unique-form-label">Preferred Service Date</label>
                <input
                    type="date"
                    name="preferredServiceDate"
                    className="unique-form-input"
                    onChange={handleChange}
                    value={inputs.preferredServiceDate}
                    required
                    min={getTodayDate()} // Prevents past date selection
                />

                <button type="submit" className="unique-submit-button">Submit</button>
            </form>
        </div>
    );
}

export default AddCustomerMaintenance;
