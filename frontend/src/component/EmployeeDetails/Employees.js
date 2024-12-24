import React, { useEffect, useState, useRef } from 'react';
import Nav from '../nav/nav';
import axios from "axios";
import Employee from '../Employee/Employee';
import { useReactToPrint } from "react-to-print";
import jsPDF from 'jspdf'; // Import jsPDF
import html2canvas from 'html2canvas'; // Import html2canvas

const URL = "http://localhost:5001/employees"; // Fetch employee data

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

function Employees() {
  const [employees, setEmployees] = useState([]); // Initialize with empty array
  const [searchQuery, setSearchQuery] = useState(""); // Initialize search query state
  const componentRef = useRef(); // Ref for capturing the content

  useEffect(() => {
    fetchHandler()
      .then((data) => {
        console.log("Fetched data:", data);
        setEmployees(data.employees);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  // Function to handle search input change
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter employees based on the search query with null/undefined checks for first name
  const filteredEmployees = employees.filter((employee) => {
    const firstName = employee?.firstName ? employee.firstName.toLowerCase() : ""; // Make sure firstName exists
    const query = searchQuery.toLowerCase();

    return firstName.includes(query); // Compare firstName with the search query
  });

  // Print functionality using react-to-print
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Employees Report",
    onAfterPrint: () => alert("Employees Report Successfully Downloaded!"),
  });

  // PDF generation function using jsPDF and html2canvas
  const handleDownloadPDF = async () => {
    const input = componentRef.current; // Get the content to print
    if (input) {
      try {
        // Use html2canvas to take a screenshot of the content
        const canvas = await html2canvas(input);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        // Add the image to the PDF
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save("employees-report.pdf"); // Save the generated PDF
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    }
  };

  return (
    <div><Nav />
    <div className="yy-employees">
      
      <h1 className="yy-header">Employee Details Display Page</h1>

      {/* Search input field */}
      <input 
        type="text" 
        className="yy-search-input"
        placeholder="Search by First Name" 
        value={searchQuery} 
        onChange={handleSearch} 
      />

      {/* Ref is applied to this div so that its content can be printed */}
      <div ref={componentRef} className="yy-employee-list">
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((employee, i) => (
            <div key={i} className="yy-employee-item">
              <Employee employee={employee} />
            </div>
          ))
        ) : (
          <p>No employees found.</p>
        )}
      </div>

      {/* Buttons to trigger print/download functionalities */}
      <button className="yy-download-button" onClick={handleDownloadPDF}>Download as PDF Report</button>
    </div>
    </div>
  );
}

export default Employees;
