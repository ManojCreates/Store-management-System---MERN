import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './UpdateEmployee.css';

function UpdateEmployee() {
    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
        employeeId: "",
        age: "",
        gender: "",
        jobTitle: "",
        department: "",
    });
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        employeeId: "",
        age: "",
        gender: "",
        jobTitle: ""
    });

    const history = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchHandler = async () => {
            const response = await axios.get(`http://localhost:5001/employees/${id}`);
            setInputs(response.data.employees);
        };
        fetchHandler();
    }, [id]);

    const validateName = (name) => /^[A-Za-z\s]*$/.test(name);
    const validateEmployeeId = (id) => /^[A-Za-z0-9]*$/.test(id);
    const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    const validateAge = (age) => age >= 18 && age <= 60;

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'firstName' || name === 'lastName') {
            if (!validateName(value)) {
                setErrors((prevState) => ({
                    ...prevState,
                    [name]: "Name should only contain letters and spaces. No numbers or special characters allowed."
                }));
            } else {
                setErrors((prevState) => ({ ...prevState, [name]: "" }));
                setInputs((prevState) => ({
                    ...prevState,
                    [name]: capitalizeFirstLetter(value)
                }));
            }
        } else if (name === 'employeeId') {
            if (!validateEmployeeId(value)) {
                setErrors((prevState) => ({
                    ...prevState,
                    employeeId: "Employee ID should not contain special characters."
                }));
            } else {
                setErrors((prevState) => ({ ...prevState, employeeId: "" }));
                setInputs((prevState) => ({ ...prevState, employeeId: value }));
            }
        } else if (name === 'age') {
            const ageValue = Number(value);
            if (!validateAge(ageValue) || isNaN(ageValue)) {
                setErrors((prevState) => ({
                    ...prevState,
                    age: "Age should be a real number between 18 and 60."
                }));
            } else {
                setErrors((prevState) => ({ ...prevState, age: "" }));
                setInputs((prevState) => ({ ...prevState, age: ageValue }));
            }
        } else if (name === 'gender') {
            setInputs((prevState) => ({ ...prevState, gender: value }));
            setErrors((prevState) => ({ ...prevState, gender: "" }));
        } else {
            setInputs((prevState) => ({ ...prevState, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendRequest();
        history("/employeedetails");
    };

    const sendRequest = async () => {
        await axios.put(`http://localhost:5001/employees/${id}`, {
            firstName: String(inputs.firstName),
            lastName: String(inputs.lastName),
            employeeId: String(inputs.employeeId),
            age: Number(inputs.age),
            gender: String(inputs.gender),
            jobTitle: String(inputs.jobTitle),
            department: String(inputs.department),
        });
    };

    return (
        <div>
            <h1>Update Employee</h1>
            <form onSubmit={handleSubmit}>
                <label>First Name</label><br />
                <input 
                    type="text" 
                    name="firstName" 
                    onChange={handleChange} 
                    value={inputs.firstName} 
                    required 
                />
                {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName}</p>}
                <br /><br />

                <label>Last Name</label><br />
                <input 
                    type="text" 
                    name="lastName" 
                    onChange={handleChange} 
                    value={inputs.lastName} 
                    required 
                />
                {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>}
                <br /><br />

                <label>Employee ID</label><br />
                <input 
                    type="text" 
                    name="employeeId" 
                    onChange={handleChange} 
                    value={inputs.employeeId} 
                    required 
                />
                {errors.employeeId && <p style={{ color: 'red' }}>{errors.employeeId}</p>}
                <br /><br />

                <label>Age</label><br />
                <input 
                    type="number" 
                    name="age" 
                    onChange={handleChange} 
                    value={inputs.age} 
                    min="18" 
                    max="60"
                    required 
                />
                {errors.age && <p style={{ color: 'red' }}>{errors.age}</p>}
                <br /><br />

                <label>Gender</label><br />
                <input 
                    type="radio" 
                    name="gender" 
                    value="Male" 
                    onChange={handleChange} 
                    checked={inputs.gender === "Male"} 
                    required 
                /> Male
                <input 
                    type="radio" 
                    name="gender" 
                    value="Female" 
                    onChange={handleChange} 
                    checked={inputs.gender === "Female"} 
                    required 
                /> Female
                {errors.gender && <p style={{ color: 'red' }}>{errors.gender}</p>}
                <br /><br />

                <label>Job Title</label><br />
                <select name="jobTitle" onChange={handleChange} value={inputs.jobTitle} required>
                    <option value="Store Manager">Store Manager</option>
                    <option value="Sales Associate">Sales Associate</option>
                    <option value="Customer Service Representative">Customer Service Representative</option>
                    <option value="Warehouse Manager">Warehouse Manager</option>
                    <option value="Glass Cutter">Glass Cutter</option>
                    <option value="Installer">Installer</option>
                    <option value="Fabricator">Fabricator</option>
                    <option value="Design Consultant">Design Consultant</option>
                    <option value="Marketing Coordinator">Marketing Coordinator</option>
                    <option value="Accounts Manager">Accounts Manager</option>
                </select>
                {errors.jobTitle && <p style={{ color: 'red' }}>{errors.jobTitle}</p>}
                <br /><br />

                <label>Department</label><br />
                <select name="department" onChange={handleChange} value={inputs.department} required>
                    <option value="Sales Department">Sales Department</option>
                    <option value="Customer Service Department">Customer Service Department</option>
                    <option value="Warehouse/Inventory Department">Warehouse/Inventory Department</option>
                    <option value="Installation Department">Installation Department</option>
                    <option value="Production/Manufacturing Department">Production/Manufacturing Department</option>
                    <option value="Design and Consultation Department">Design and Consultation Department</option>
                    <option value="Marketing Department">Marketing Department</option>
                    <option value="Finance and Accounting Department">Finance and Accounting Department</option>
                    <option value="Human Resources Department">Human Resources Department</option>
                </select>
                <br /><br />

                

                <button type="submit" className="update-button" style={{ backgroundColor: 'blue', color: 'white' }}>Update</button>

            </form>
        </div>
    );
}

export default UpdateEmployee;
