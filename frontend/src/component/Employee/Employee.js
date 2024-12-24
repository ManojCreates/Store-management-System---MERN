import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Employee.css'; // Import the CSS file

function Employee(props) {
  const { _id, firstName, lastName, employeeId, age, gender, jobTitle, department, basicSal } = props.employee; // Added basicSal

  const history = useNavigate();

  const deleteHandler = async () => {
    await axios.delete(`http://localhost:5001/employees/${_id}`)
      .then(res => res.data)
      .then(() => history("/"))
      .then(() => history("/employeedetails"));
  };

  return (
    <div className="employee-container">
      <h1 className="employee-title">Employee Display</h1>
      <div className="employee-info">
        <h2>First Name: <span>{firstName}</span></h2>
        <h2>Last Name: <span>{lastName}</span></h2>
        <h2>Employee ID: <span>{employeeId}</span></h2>
        <h2>Age: <span>{age}</span></h2>
        <h2>Gender: <span>{gender}</span></h2>
        <h2>Job Title: <span>{jobTitle}</span></h2>
        <h2>Department: <span>{department}</span></h2>
        <h2>Basic Salary: <span>{basicSal}</span></h2>
      </div>

      <div className="button-container"> {/* Flex container for buttons */}
        <Link to={`/updateemployee/${_id}`} className="link">Update</Link>
        <button className="button" onClick={deleteHandler}>Delete</button>
      </div>
    </div>
  );
}

export default Employee;
