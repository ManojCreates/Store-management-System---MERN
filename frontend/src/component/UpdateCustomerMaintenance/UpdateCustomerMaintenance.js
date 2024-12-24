import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function UpdateCustomerMaintenance() {
    const history = useNavigate();
    const id = useParams().id;

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

    const [selectedCountryCode, setSelectedCountryCode] = useState("+94");
    const [errors, setErrors] = useState({
        name: "",
        contactNumber: "",
        email: "",
        address: "",
    });

    const countryCodeRules = {
        "+94": { length: 9, regex: /^[0-9]{9}$/ },
        "+1": { length: 10, regex: /^[0-9]{10}$/ },
        "+44": { length: 10, regex: /^[0-9]{10}$/ },
    };

    const fetchHandler = useCallback(async () => {
        await axios
            .get(`http://localhost:5001/customerMaintenances/${id}`)
            .then((res) => res.data)
            .then((data) => {
                setInputs({
                    ...data.customerMaintenances,
                    glassType: Array.isArray(data.customerMaintenances?.glassType) 
                        ? data.customerMaintenances.glassType 
                        : [], // Ensure glassType is an array
                });
            });
    }, [id]);
    

    useEffect(() => {
        fetchHandler();
    }, [fetchHandler]);

    const validateName = (value) => {
        const nameRegex = /^[A-Za-z\s]+$/;
        let errorMessage = "";

        if (!nameRegex.test(value)) {
            errorMessage = "Name can only contain letters and spaces.";
        } else if (value.length < 2) {
            errorMessage = "Name must be at least 2 characters long.";
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            name: errorMessage,
        }));

        return !errorMessage;
    };

    const validateContactNumber = (value) => {
        const countryCode = selectedCountryCode;
        let errorMessage = "";

        if (value.length > 10) {
            errorMessage = `Contact number cannot exceed 10 digits.`;
        } else if (countryCodeRules[countryCode]) {
            const { length, regex } = countryCodeRules[countryCode];

            if (value.length !== length || !regex.test(value)) {
                errorMessage = `Contact number for ${countryCode} must be exactly ${length} digits.`;
            }
        } else {
            errorMessage = `Invalid country code: ${countryCode}.`;
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            contactNumber: errorMessage,
        }));

        return !errorMessage;
    };

    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let errorMessage = "";

        if (!emailRegex.test(value)) {
            errorMessage = "Please enter a valid email address.";
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            email: errorMessage,
        }));

        return !errorMessage;
    };

    const validateAddress = (value) => {
        let errorMessage = "";

        if (value.length < 5) {
            errorMessage = "Address must be at least 5 characters long.";
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            address: errorMessage,
        }));

        return !errorMessage;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "name") {
            const filteredValue = value.replace(/[^a-zA-Z\s]/g, '');
            const capitalizedValue = filteredValue.replace(/\b\w/g, char => char.toUpperCase());
            validateName(capitalizedValue);
            setInputs((prevState) => ({
                ...prevState,
                [name]: capitalizedValue,
            }));
        } else if (name === "contactNumber") {
            if (value.length <= 10) {
                validateContactNumber(value);
                setInputs((prevState) => ({
                    ...prevState,
                    contactNumber: value,
                }));
            }
        } else if (name === "email") {
            validateEmail(value);
            setInputs((prevState) => ({
                ...prevState,
                email: value,
            }));
        } else if (name === "address") {
            validateAddress(value);
            setInputs((prevState) => ({
                ...prevState,
                address: value,
            }));
        } else {
            setInputs((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
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

            return {
                ...prevState,
                glassType: updatedGlassTypes,
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isNameValid = validateName(inputs.name);
        const isContactNumberValid = validateContactNumber(inputs.contactNumber);
        const isEmailValid = validateEmail(inputs.email);
        const isAddressValid = validateAddress(inputs.address);

        if (isNameValid && isContactNumberValid && isEmailValid && isAddressValid) {
            sendRequest().then(() => history("/customerMaintenanceDetails"));
        }
    };

    const sendRequest = async () => {
        const fullContactNumber = `${selectedCountryCode}${inputs.contactNumber}`;
        await axios.put(`http://localhost:5001/customerMaintenances/${id}`, {
            name: String(inputs.name),
            contactNumber: fullContactNumber,
            email: String(inputs.email),
            address: String(inputs.address),
            serviceType: String(inputs.serviceType),
            glassType: inputs.glassType,
            dimensions: inputs.dimensions,
            issueDescription: String(inputs.issueDescription),
            preferredServiceDate: inputs.preferredServiceDate,
        }).then((res) => res.data);
    };

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <div>
            <h1>Update Customer Maintenance</h1>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <br />
                <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={inputs.name}
                    required
                />
                {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                <br /><br />

                <label>Contact Number</label>
                <br />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <select
                        value={selectedCountryCode}
                        onChange={(e) => setSelectedCountryCode(e.target.value)}
                        style={{ marginRight: '10px' }}
                    >
                        <option value="+94">+94 (Sri Lanka)</option>
                        <option value="+1">+1 (USA)</option>
                        <option value="+44">+44 (UK)</option>
                    </select>
                    <input
                        type="text"
                        name="contactNumber"
                        onChange={handleChange}
                        value={inputs.contactNumber}
                        placeholder="Enter phone number"
                        required
                    />
                    
                </div>
                {errors.contactNumber && <p style={{ color: 'red' }}>{errors.contactNumber}</p>}
                <br /><br />

                <label>Email</label>
                <br />
                <input
                    type="text"
                    name="email"
                    onChange={handleChange}
                    value={inputs.email}
                    required
                />
                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                <br /><br />

                <label>Address</label>
                <br />
                <input
                    type="text"
                    name="address"
                    onChange={handleChange}
                    value={inputs.address}
                    required
                />
                {errors.address && <p style={{ color: 'red' }}>{errors.address}</p>}
                <br /><br />

                <label>Service Type</label>
                <br />
                <input type="radio" name="serviceType" value="Replace" checked={inputs.serviceType === "Replace"} onChange={handleChange}/>Replace &nbsp;&nbsp;
                <input type="radio" name="serviceType" value="Maintenance" checked={inputs.serviceType === "Maintenance"} onChange={handleChange}/>Maintenance
                <br /><br />

                <label>Glass Type</label>
                <br />
                <input
                type="checkbox"
                name="glassType"
                value="Toughned Glass"
                checked={inputs.glassType?.includes("Toughned Glass")}
                onChange={handleGlassTypeChange}
                /> Toughned Glass &nbsp;&nbsp;
                <input
                type="checkbox"
                name="glassType"
                value="Laminated Glass"
                checked={inputs.glassType?.includes("Laminated Glass")}
                onChange={handleGlassTypeChange}
                /> Laminated Glass &nbsp;&nbsp;
                <input
                type="checkbox"
                name="glassType"
                value="Mirrored Glass"
                checked={inputs.glassType?.includes("Mirrored Glass")}
                onChange={handleGlassTypeChange}
                /> Mirrored Glass

                <br /><br />

                <label>Dimensions (Height x Width x Thickness)</label>
                <br />
                <input
                    type="text"
                    name="dimensions"
                    onChange={handleChange}
                    value={inputs.dimensions}
                    required
                />

                <label>Issue Description</label>
                <br /><br />
                <textarea name="issueDescription" onChange={handleChange} value={inputs.issueDescription} rows="5" cols="40" />
                <br /><br />
                
                <label>Preferred Service Date</label>
                <br />
                <input
                    type="date"
                    name="preferredServiceDate"
                    min={getTodayDate()}
                    onChange={handleChange}
                    value={inputs.preferredServiceDate}
                    required
                />
                <br /><br />

                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default UpdateCustomerMaintenance;
