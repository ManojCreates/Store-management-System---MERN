import React, { useEffect, useState, useRef } from 'react';
import Nav from '../nav/nav';
import axios from "axios";
import AdminMaintenance from '../AdminMaintenance/AdminMaintenance';
import { useReactToPrint } from "react-to-print";
import './AdminMaintenances.css'; // Import the CSS file

const URL = "http://localhost:5001/adminMaintenances";

// Fetch admin maintenance data
const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function AdminMaintenances() {
  const [adminMaintenances, setAdminMaintenances] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const componentsRef = useRef();

  useEffect(() => {
    fetchHandler().then((data) => setAdminMaintenances(data.adminMaintenances));
  }, []);

  // Printing handler for generating reports
  const handlePrint = useReactToPrint({
    content: () => componentsRef.current,
    documentTitle: "LANKA GLASS HOUSE Maintenance Report",
    onAfterPrint: () => alert("LANKA GLASS HOUSE Maintenance Report Successfully Downloaded!"),
  });

  // Search function to filter the admin maintenance data
  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredAdminMaintenances = data.adminMaintenances.filter((adminMaintenance) =>
        Object.values(adminMaintenance).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setAdminMaintenances(filteredAdminMaintenances);
      setNoResults(filteredAdminMaintenances.length === 0);
    });
  };

  // WhatsApp sharing handler
  const handleSendReportWhatsApp = () => {
    const phoneNumber = "+94766981768"; // Example phone number
    const message = "Selected Admin Maintenance Report";
    const WhatsAppUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;
    window.open(WhatsAppUrl, "_blank");
  };

  // Email sharing handler
  const handleSendReportEmail = () => {
    if (!adminMaintenances || adminMaintenances.length === 0) {
      alert("No admin maintenance data to send!");
      return;
    }

    const emailContent = adminMaintenances
      .map((adminMaintenance) => {
        return `\
          Admin Name: ${adminMaintenance.name}
          Contact Number: ${adminMaintenance.contactNumber}
          Issue Type: ${adminMaintenance.issueType}
          Issue Description: ${adminMaintenance.issueDescription}
          Assigned Technician: ${adminMaintenance.assignedTechnician}
          Status: ${adminMaintenance.status}
        `;
      })
      .join("\n\n");

    const subject = "LANKA GLASS HOUSE Maintenance Report";
    const body = encodeURIComponent(emailContent);
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${body}`;
    window.open(mailtoLink, "_blank");
  };

  return (
    <div><Nav />
      <div id="admin-maintenance-container">
        
        <h1 id="admin-maintenance-title">Admin Maintenance Details Display Page</h1>
        <div className="search-container">
          <input
            id="search-input"
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            name="search"
            placeholder="Search Admin Maintenances Details"
          />
          <button className="btn-search" onClick={handleSearch}>Search</button>
        </div>

        {noResults ? (
          <div className="results-container">
            <p className="no-results">No Admin Maintenances Found</p>
          </div>
        ) : (
          <div ref={componentsRef} className="results-container">
            {adminMaintenances &&
              adminMaintenances.map((adminMaintenance, i) => (
                <div key={i}>
                  <AdminMaintenance adminMaintenance={adminMaintenance} />
                </div>
              ))}
          </div>
        )}
        <div className="button-container">
          <button className="btn-download" onClick={handlePrint}>Download Report</button>
          <button className="btn-whatsapp" onClick={handleSendReportWhatsApp}>Send WhatsApp Message</button>
          <button className="btn-email" onClick={handleSendReportEmail}>Send Email</button>
        </div>
      </div>
    </div>
  );
}

export default AdminMaintenances;
