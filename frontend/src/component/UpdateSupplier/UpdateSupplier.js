import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams, useLocation } from "react-router";
import { useNavigate } from "react-router";

function UpdateSupplier() {
    const [inputs, setInputs] = useState({
        SupplierName: '',
        ContactPerson: '',
        SupplierEmail: '',
        SupplierPhoneNumber: '',
        SupplierAddress: '',
        SupplierProducts: '',
        SupplierRating: '',
    });
    const history = useNavigate();
    const { id } = useParams(); // Get the supplier ID from the URL params
    const location = useLocation(); // Hook to access the passed state
    const { supplier } = location.state; // Extract supplier data from state

    useEffect(() => {
        // Populate inputs with the supplier data passed from the Link
        if (supplier) {
            setInputs(supplier);
        }
    }, [supplier]);

    const sendRequest = async () => {
        await axios.put(`http://localhost:5001/suppliers/${id}`, inputs); // Update the supplier
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let filteredValue = value;

        // Validation logic for specific fields
        switch (name) {
            case 'SupplierName':
                filteredValue = value.replace(/[^A-Za-z\s]/g, ''); // Only letters and spaces
                break;

            case 'ContactPerson':
                    filteredValue = value.replace(/[^A-Za-z\s]/g, ''); // Only letters and spaces
                    break;
            
            case 'SupplierPhoneNumber':
                filteredValue = value.replace(/[^0-9]/g, ''); // Only numbers
                if (filteredValue.length > 10) filteredValue = filteredValue.slice(0, 10); // Limit to 10 digits
                if (filteredValue.length > 0 && filteredValue[0] !== '0') filteredValue = ''; // Must start with 0
                break;
            case 'SupplierProducts':
                filteredValue = value.replace(/[0-9]/g, ''); // No numbers
                break;
            case 'SupplierRating':
                filteredValue = value.replace(/[0-9]/g, ''); // No numbers
                break;
            default:
                break;
        }

        setInputs((prevState) => ({
            ...prevState,
            [name]: filteredValue,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendRequest(); // Send updated supplier data to the backend
        history("/supplierdetails"); // Redirect to supplier details page
    };

    return (
        <div>
            <h1>Update Supplier</h1>
            <form onSubmit={handleSubmit}>
                <label>Supplier Name</label><br />
                <input type="text" name="SupplierName" onChange={handleChange} value={inputs.SupplierName} required /><br /><br />

                <label>Contact Person</label><br />
                <input type="text" name="ContactPerson" onChange={handleChange} value={inputs.ContactPerson} required /><br /><br />

                <label>Supplier Email</label><br />
                <input type="email" name="SupplierEmail" onChange={handleChange} value={inputs.SupplierEmail} required /><br /><br />

                <label>Supplier Phone Number</label><br />
                <input type="text" name="SupplierPhoneNumber" onChange={handleChange} value={inputs.SupplierPhoneNumber} required /><br /><br />

                <label>Supplier Address</label><br />
                <input type="text" name="SupplierAddress" onChange={handleChange} value={inputs.SupplierAddress} required /><br /><br />

                <label>Supplier Products</label><br />
                <input type="text" name="SupplierProducts" onChange={handleChange} value={inputs.SupplierProducts} required /><br /><br />

                <label>Supplier Rating</label><br />
                <input type="text" name="SupplierRating" onChange={handleChange} value={inputs.SupplierRating} required /><br /><br />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default UpdateSupplier;
