import React, { useState, useEffect } from 'react';
import Nav from '../nav/nav';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import './AddAdminMaintenance.css';

function AddAdminMaintenance() {
    const history = useNavigate();
    const location = useLocation();
    const { id } = useParams();

    // Initial input state
    const [inputs, setInputs] = useState({
        name: location.state?.name || "",  
        contactNumber: location.state?.contactNumber || "",
        address: location.state?.address || "",
        typeofservice: location.state?.serviceType || "",
        glasstype: location.state?.glassType || "",
        size: location.state?.dimensions || "",
        issueDescription: location.state?.issueDescription || "",
        requeststatus: "Pending",
        assignedtechnician: [],  // Initially empty
        scheduleddate: "", // Ensure date-only format
    });

    // Fetch customer data based on ID and pre-fill form
    useEffect(() => {
        const fetchCustomerDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/customerMaintenances/${id}`);
                const data = response.data;
                setInputs({
                    name: data.name,
                    contactNumber: data.contactNumber,
                    address: data.address,
                    typeofservice: data.serviceType,
                    glasstype: data.glassType.join(", "),
                    size: data.dimensions,
                    issueDescription: data.issueDescription,
                    requeststatus: "Pending",
                    assignedtechnician: data.assignedtechnician || [],  // Set existing technicians if available
                    scheduleddate: data.scheduleddate ? data.scheduleddate.split("T")[0] : "", // Display date only
                });
            } catch (error) {
                console.error("Error fetching customer data:", error);
            }
        };

        if (id) {
            fetchCustomerDetails();
        }
    }, [id]);

    // Handle input change
    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        if (name === "assignedtechnician") {
            let updatedTechnician = [...inputs.assignedtechnician];

            if (checked) {
                // Add technician if checked
                updatedTechnician.push(value);
            } else {
                // Remove technician if unchecked
                updatedTechnician = updatedTechnician.filter(item => item !== value);
            }

            setInputs((prevState) => ({
                ...prevState,
                assignedtechnician: updatedTechnician,  // Update technician state properly
            }));
        } else {
            setInputs((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest().then(() => history("/adminMaintenanceDetails"));
    };

    // Send request
    const sendRequest = async () => {
        const formattedDate = inputs.scheduleddate ? inputs.scheduleddate : null;
        await axios.post("http://localhost:5001/adminMaintenances", {
            name: String(inputs.name),
            contactNumber: String(inputs.contactNumber),
            address: String(inputs.address),
            typeofservice: String(inputs.typeofservice),
            glasstype: String(inputs.glasstype),
            size: String(inputs.size),
            issueDescription: String(inputs.issueDescription),
            requeststatus: String(inputs.requeststatus),
            assignedtechnician: inputs.assignedtechnician,  // Send updated technicians
            scheduleddate: formattedDate,
        }).then(res => res.data);
    };

    return (
        <div>
            <Nav />
            <h1>Admin Maintenance</h1>
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
                <label>Type of Service</label>
                <br />
                <input type="text" name="typeofservice" onChange={handleChange} value={inputs.typeofservice} required />
                <br /><br />
                <label>Glass Type</label>
                <br />
                <input type="text" name="glasstype" onChange={handleChange} value={inputs.glasstype} required />
                <br /><br />
                <label>Size</label>
                <br />
                <input type="text" name="size" onChange={handleChange} value={inputs.size} required />
                <br /><br />
                <label>Issue Description</label>
                <br />
                <input type="text" name="issueDescription" onChange={handleChange} value={inputs.issueDescription} required />
                <br /><br />
                <label>Request Status</label>
                <br />
                <input type="radio" name="requeststatus" value="Pending" checked={inputs.requeststatus === "Pending"} onChange={handleChange} />Pending &nbsp;&nbsp;
                <input type="radio" name="requeststatus" value="In Progress" checked={inputs.requeststatus === "In Progress"} onChange={handleChange} />In Progress &nbsp;&nbsp;
                <input type="radio" name="requeststatus" value="Completed" checked={inputs.requeststatus === "Completed"} onChange={handleChange} />Completed &nbsp;&nbsp;
                <input type="radio" name="requeststatus" value="Canceled" checked={inputs.requeststatus === "Canceled"} onChange={handleChange} />Canceled
                <br /><br />
                <label>Technicians</label>
                <br />
                <input type="checkbox" name="assignedtechnician" value="Kamal Perera" checked={inputs.assignedtechnician.includes("Kamal Perera")} onChange={handleChange} />Kamal Perera <br />
                <input type="checkbox" name="assignedtechnician" value="Nimal Perera" checked={inputs.assignedtechnician.includes("Nimal Perera")} onChange={handleChange} />Nimal Perera <br />
                <input type="checkbox" name="assignedtechnician" value="Amal Perera" checked={inputs.assignedtechnician.includes("Amal Perera")} onChange={handleChange} />Amal Perera
                <br /><br />
                <label>Scheduled Date</label>
                <br />
                <input type="date" name="scheduleddate" onChange={handleChange} value={inputs.scheduleddate || ''} required />
                <br /><br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddAdminMaintenance;
