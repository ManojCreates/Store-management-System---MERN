import React, { useEffect, useState, useRef } from 'react';
import Nav from '../nav/customernav';
import axios from "axios";
import User from '../User/User';
import { useReactToPrint } from "react-to-print";
import jsPDF from 'jspdf'; // Import jsPDF
import html2canvas from 'html2canvas'; // Import html2canvas
import './users.css';

const URL = "http://localhost:5001/users";

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

function Users() {
  const [users, setUsers] = useState([]); // Initialize with empty array
  const ComponentsRef = useRef(); // Ref for capturing the content

  useEffect(() => {
    fetchHandler()
      .then((data) => {
        console.log("Fetched data:", data);
        setUsers(data.users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Profile Report",
    onAfterPrint: () => alert("Users Report Successfully Downloaded!"),
  });

  // PDF generation function using jsPDF and html2canvas
  const handleDownloadPDF = async () => {
    const input = ComponentsRef.current; // Get the content to print
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
        pdf.save("profile-report.pdf"); // Save the generated PDF
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    }
  };

  return (
    <div>
      <Nav />
      <h1>Profile</h1>
      <div ref={ComponentsRef} style={{ padding: '20px', border: '1px solid #ccc' }}>
        {users.length > 0 ? (
          users.map((user, i) => (
            <div key={i} style={{ marginBottom: '20px' }}>
              <User user={user} />
            </div>
          ))
        ) : (
          <p>No users available to display.</p>
        )}
      </div>
      
      <button onClick={handleDownloadPDF} className="download-pdf-button">Download as PDF Report</button>
    </div>
  );
}

export default Users;
