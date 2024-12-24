import React, { useState, useEffect } from 'react';
import Nav from '../nav/nav';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import './AddAdminDelivery.css';

function AddAdminDelivery() {
    const history = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const [inputs, setInputs] = useState({
        name: location.state?.name || "",  // Set default from passed data or empty
        contactNumber: location.state?.contactNumber || "",
        address: location.state?.address || "",
        glasstypeandsize: location.state?.glassType || "",
        quantity: location.state?.quantity || "",
        specialInstructions: location.state?.specialInstructions || "",
        deliverystatus: "Pending",
        assigneddriver: [],
        deliverydate: "",  // Only date part will be stored
    });

    // Fetch customer data based on the ID
    useEffect(() => {
        const fetchCustomerDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/customerDeliveries/${id}`);
                const data = response.data;

                // Pre-fill the form with the fetched data
                setInputs({
                    name: data.name,
                    contactNumber: data.contactNumber,
                    address: data.address,
                    glasstypeandsize: data.glassType.join(", "),
                    quantity: data.quantity,
                    specialInstructions: data.specialInstructions,
                    deliverystatus: "Pending",
                    assigneddriver: [],
                    deliverydate: data.deliverydate ? data.deliverydate.split("T")[0] : "",  // Split to remove time part
                });
            } catch (error) {
                console.error("Error fetching customer data:", error);
            }
        };

        if (id) {
            fetchCustomerDetails();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        if (name === "assigneddriver") {
            let updatedDriver = [...inputs.assigneddriver];

            if (checked) {
                updatedDriver.push(value);
            } else {
                updatedDriver = updatedDriver.filter((item) => item !== value);
            }

            setInputs((prevState) => ({
                ...prevState,
                assigneddriver: updatedDriver,
            }));
        } else {
            setInputs((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest().then(() => history("/adminDeliveryDetails"));
    };

    const sendRequest = async () => {
        const formattedDate = inputs.deliverydate ? inputs.deliverydate : null;
        await axios.post("http://localhost:5001/adminDeliveries", {
            name: String(inputs.name),
            contactNumber: String(inputs.contactNumber),
            address: String(inputs.address),
            glasstypeandsize: String(inputs.glasstypeandsize),
            quantity: Number(inputs.quantity),
            specialInstructions: String(inputs.specialInstructions),
            deliverystatus: String(inputs.deliverystatus),
            assigneddriver: inputs.assigneddriver,
            deliverydate: formattedDate,  // Ensure date is sent correctly
        }).then(res => res.data);
    };

    return (
        <div>
            <Nav />
            <h1>Add Admin Delivery</h1>
            <form onSubmit={handleSubmit}>
                <label>Customer Name</label>
                <br />
                <input type="text" name="name" onChange={handleChange} value={inputs.name} required />
                <br /><br />
                <label>Contact Number</label>
                <br />
                <input type="text" name="contactNumber" onChange={handleChange} value={inputs.contactNumber} required />
                <br /><br />
                <label>Address</label>
                <br />
                <input type="text" name="address" onChange={handleChange} value={inputs.address} required />
                <br /><br />
                <label>Glass Type & Size</label>
                <br />
                <input type="text" name="glasstypeandsize" onChange={handleChange} value={inputs.glasstypeandsize} required />
                <br /><br />
                <label>Quantity</label>
                <br />
                <input type="Number" name="quantity" onChange={handleChange} value={inputs.quantity} required />
                <br /><br />
                <label>Special Instruction</label>
                <br />
                <input type="text" name="specialInstructions" onChange={handleChange} value={inputs.specialInstructions} required />
                <br /><br />
                <label>Delivery Status</label>
                <br />
                <input type="radio" name="deliverystatus" value="Pending" checked={inputs.deliverystatus === "Pending"} onChange={handleChange} />Pending &nbsp;&nbsp;
                <input type="radio" name="deliverystatus" value="In Progress" checked={inputs.deliverystatus === "In Progress"} onChange={handleChange} />In Progress &nbsp;&nbsp;
                <input type="radio" name="deliverystatus" value="Completed" checked={inputs.deliverystatus === "Completed"} onChange={handleChange} />Completed &nbsp;&nbsp;
                <input type="radio" name="deliverystatus" value="Canceled" checked={inputs.deliverystatus === "Canceled"} onChange={handleChange} />Canceled
                <br /><br />
                <label>Drivers</label>
                <br />
                <input type="checkbox" name="assigneddriver" value="Kamal Perera" checked={inputs.assigneddriver.includes("Kamal Perera")} onChange={handleChange} />Kamal Perera <br />
                <input type="checkbox" name="assigneddriver" value="Nimal Perera" checked={inputs.assigneddriver.includes("Nimal Perera")} onChange={handleChange} />Nimal Perera <br />
                <input type="checkbox" name="assigneddriver" value="Amal Perera" checked={inputs.assigneddriver.includes("Amal Perera")} onChange={handleChange} />Amal Perera
                <br /><br />
                <label>Delivery Date</label>
                <br />
                <input type="date" name="deliverydate" onChange={handleChange} value={inputs.deliverydate || ''} required />
                <br /><br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddAdminDelivery;
