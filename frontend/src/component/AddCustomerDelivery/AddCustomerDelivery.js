import React, { useState } from 'react';
import Nav from '../nav/customernav';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './AddCustomerDelivery.css';  // Import the CSS file

function AddCustomerDelivery() {
    const history = useNavigate();
    const [inputs, setInputs] = useState({
        name: "",
        contactNumber: "",
        email: "",
        address: "",
        glassType: [],
        quantity: "",
        specialInstructions: "",
        preferredDeliveryDate: "",
    });

    const [selectedCountryCode, setSelectedCountryCode] = useState("+94");

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleGlassTypeChange = (e) => {
        const { value, checked } = e.target;
        setInputs((prevState) => {
            let updatedGlassTypes = [...prevState.glassType];
            if (checked) {
                updatedGlassTypes.push(value);
            } else {
                updatedGlassTypes = updatedGlassTypes.filter((type) => type !== value);
            }
            return { ...prevState, glassType: updatedGlassTypes };
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "name") {
            const filteredValue = value.replace(/[^a-zA-Z\s]/g, '');
            const capitalizedValue = filteredValue.replace(/\b\w/g, char => char.toUpperCase());
            setInputs((prevState) => ({ ...prevState, [name]: capitalizedValue }));
        } else if (name === "contactNumber") {
            const numericValue = value.replace(/\D/g, '');
            if (numericValue.length <= 10) {
                setInputs((prevState) => ({ ...prevState, contactNumber: numericValue }));
            }
        } else {
            setInputs((prevState) => ({ ...prevState, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendRequest();
        history("/customerhome");
    };

    const sendRequest = async () => {
        const fullContactNumber = `${selectedCountryCode}${inputs.contactNumber}`;
        await axios.post("http://localhost:5001/customerDeliveries", {
            name: String(inputs.name),
            contactNumber: fullContactNumber,
            email: String(inputs.email),
            address: String(inputs.address),
            glassType: inputs.glassType,
            quantity: Number(inputs.quantity),
            specialInstructions: String(inputs.specialInstructions),
            preferredDeliveryDate: inputs.preferredDeliveryDate,
        }).then(res => res.data);
    };

    return (
        <div id="unique-delivery-form-container">
            <Nav />
            <div id="unique-delivery-banner"></div>
            <h1 id="unique-delivery-heading">Enter Your Delivery Details</h1>
            <form className="unique-delivery-form" onSubmit={handleSubmit}>
                <label htmlFor="name" className="unique-form-label">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={handleChange}
                    value={inputs.name}
                    className="unique-form-input"
                    required
                />

                <label htmlFor="contactNumber" className="unique-form-label">Contact Number</label>
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
                        id="contactNumber"
                        name="contactNumber"
                        onChange={handleChange}
                        value={inputs.contactNumber}
                        placeholder="Enter phone number"
                        className="unique-form-input"
                        required
                    />
                </div>

                <label htmlFor="email" className="unique-form-label">Email</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    value={inputs.email}
                    className="unique-form-input"
                    required
                />

                <label htmlFor="address" className="unique-form-label">Address</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    onChange={handleChange}
                    value={inputs.address}
                    className="unique-form-input"
                    required
                />

                <label className="unique-form-label">Glass Type</label>
                <div id="unique-glass-type-checkboxes">
                    <label>
                        <input
                            type="checkbox"
                            name="glassType"
                            value="Toghned Glass"
                            checked={inputs.glassType.includes("Toghned Glass")}
                            onChange={handleGlassTypeChange}
                            className="unique-form-checkbox"
                        /> Toghned Glass
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="glassType"
                            value="Laminated Glass"
                            checked={inputs.glassType.includes("Laminated Glass")}
                            onChange={handleGlassTypeChange}
                            className="unique-form-checkbox"
                        /> Laminated Glass
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="glassType"
                            value="Mirrored Glass"
                            checked={inputs.glassType.includes("Mirrored Glass")}
                            onChange={handleGlassTypeChange}
                            className="unique-form-checkbox"
                        /> Mirrored Glass
                    </label>
                </div>

                <label htmlFor="quantity" className="unique-form-label">Quantity</label>
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    onChange={handleChange}
                    value={inputs.quantity}
                    className="unique-form-input"
                    required
                />

                <label htmlFor="specialInstructions" className="unique-form-label">Special Instructions</label>
                <textarea
                    id="special-instructions"
                    name="specialInstructions"
                    onChange={handleChange}
                    value={inputs.specialInstructions}
                    className="unique-form-textarea"
                ></textarea>

                <label htmlFor="preferredDeliveryDate" className="unique-form-label">Preferred Delivery Date</label>
                <input
                    type="date"
                    id="preferredDeliveryDate"
                    name="preferredDeliveryDate"
                    onChange={handleChange}
                    value={inputs.preferredDeliveryDate}
                    className="unique-form-input"
                    min={getTodayDate()}
                    required
                />

                <button type="submit" className="unique-submit-button">Submit</button>
            </form>
        </div>
    );
}

export default AddCustomerDelivery;
