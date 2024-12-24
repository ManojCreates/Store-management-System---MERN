import React, { useState } from 'react';
import Nav from '../nav/nav';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './AddEmployee.css';

function AddEmployee() {
    const history = useNavigate();
    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
        employeeId: "",
        age: "",
        gender: "",
        jobTitle: "",
        department: "",
        basicSal: ""  // Add this line
    });
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        employeeId: "",
        age: "",
        gender: "",
        jobTitle: "",
        basicSal: ""  // Add this line for error handling
    });

    const validateName = (name) => {
        const regex = /^[A-Za-z\s]*$/;
        return regex.test(name);
    };

    const validateEmployeeId = (id) => {
        const regex = /^[A-Za-z0-9]*$/;
        return regex.test(id);
    };

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const validateAge = (age) => {
        return age >= 18 && age <= 60;
    };

    const validateBasicSal = (basicSal) => {
        const regex = /^[0-9]*$/;
        return regex.test(basicSal);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'firstName' || name === 'lastName') {
            if (!validateName(value)) {
                setErrors((prevState) => ({
                    ...prevState,
                    [name]: "Name should only contain letters and spaces. No numbers or special characters allowed."
                }));
            } else {
                setErrors((prevState) => ({
                    ...prevState,
                    [name]: ""
                }));
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
                setErrors((prevState) => ({
                    ...prevState,
                    employeeId: ""
                }));
                setInputs((prevState) => ({
                    ...prevState,
                    employeeId: value,
                }));
            }
        } else if (name === 'age') {
            const ageValue = Number(value);
            if (!validateAge(ageValue) || isNaN(ageValue)) {
                setErrors((prevState) => ({
                    ...prevState,
                    age: "Age should be a real number between 18 and 60."
                }));
            } else {
                setErrors((prevState) => ({
                    ...prevState,
                    age: ""
                }));
                setInputs((prevState) => ({
                    ...prevState,
                    age: ageValue,
                }));
            }
        } else if (name === 'basicSal') {
            if (!validateBasicSal(value)) {
                setErrors((prevState) => ({
                    ...prevState,
                    basicSal: "Basic Salary should only contain numbers."
                }));
            } else {
                setErrors((prevState) => ({
                    ...prevState,
                    basicSal: ""
                }));
                setInputs((prevState) => ({
                    ...prevState,
                    basicSal: value
                }));
            }
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
        sendRequest().then(() => history("/employeedetails"));
    };

    const sendRequest = async () => {
        await axios.post("http://localhost:5001/employees", {
            firstName: String(inputs.firstName),
            lastName: String(inputs.lastName),
            employeeId: String(inputs.employeeId),
            age: Number(inputs.age),
            gender: String(inputs.gender),
            jobTitle: String(inputs.jobTitle),
            department: String(inputs.department),
            basicSal: Number(inputs.basicSal)  // Make sure to convert to a number
        }).then(res => res.data);
    };

    return (
        <div id="formContainer">
            <Nav />
            <h1>Add Employee</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstNameInput">First Name</label><br />
                <input 
                    type="text" 
                    id="firstNameInput" 
                    name="firstName" 
                    onChange={handleChange} 
                    value={inputs.firstName} 
                    required 
                />
                {/* Removed error message for First Name */}
                <br />

                <label htmlFor="lastNameInput">Last Name</label><br />
                <input 
                    type="text" 
                    id="lastNameInput" 
                    name="lastName" 
                    onChange={handleChange} 
                    value={inputs.lastName} 
                    required 
                />
                {/* Removed error message for Last Name */}
                <br />

                <label htmlFor="employeeIdInput">Employee ID</label><br />
                <input 
                    type="text" 
                    id="employeeIdInput" 
                    name="employeeId" 
                    onChange={handleChange} 
                    value={inputs.employeeId} 
                    required 
                />
                {errors.employeeId && <p id="errorMessage">{errors.employeeId}</p>}
                <br />

                <label htmlFor="ageInput">Age</label><br />
                <input 
                    type="number" 
                    id="ageInput" 
                    name="age" 
                    onChange={handleChange} 
                    value={inputs.age} 
                    min="18" 
                    max="60"
                    required 
                />
                {errors.age && <p id="errorMessage">{errors.age}</p>}
                <br />

                <label>Gender</label><br />
                <input 
                    type="radio" 
                    id="genderInputMale" 
                    name="gender" 
                    value="Male" 
                    onChange={handleChange} 
                    checked={inputs.gender === "Male"} 
                    required 
                /> Male
                <input 
                    type="radio" 
                    id="genderInputFemale" 
                    name="gender" 
                    value="Female" 
                    onChange={handleChange} 
                    checked={inputs.gender === "Female"} 
                    required 
                /> Female
                {errors.gender && <p id="errorMessage">{errors.gender}</p>}
                <br />

                <label htmlFor="jobTitleSelect">Job Title</label><br />
                <select id="jobTitleSelect" name="jobTitle" onChange={handleChange} value={inputs.jobTitle} required>
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
                {errors.jobTitle && <p id="errorMessage">{errors.jobTitle}</p>}
                <br />

                <label htmlFor="departmentSelect">Department</label><br />
                <select id="departmentSelect" name="department" onChange={handleChange} value={inputs.department} required>
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
                <br />

                <label htmlFor="basicSalInput">Basic Salary</label><br />
                <input 
                    type="text" // Changed input type from number to text
                    id="basicSalInput" 
                    name="basicSal" 
                    onChange={handleChange} 
                    value={inputs.basicSal} 
                    required 
                />
                {/* Removed error message for Basic Salary */}
                <br /><br />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddEmployee;
