import React, { useEffect, useState, useRef } from 'react';
import Nav from '../nav/nav';
import axios from "axios";
import CustomerMaintenance from '../CustomerMaintenance/CustomerMaintenance';
import { useReactToPrint } from "react-to-print";
import './CustomerMaintenances.css'; // Import the CSS file

const URL = "http://localhost:5001/customerMaintenances";

// Fetch customer maintenance data
const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function CustomerMaintenances() {
  const [customerMaintenances, setCustomerMaintenances] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => setCustomerMaintenances(data.customerMaintenances));
  }, []);

  const ComponentsRef = useRef();

  // Printing handler for generating reports
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "LANKA GLASS HOUSE Maintenance Report",
    onAfterPrint: () => alert("LANKA GLASS HOUSE Maintenance Report Successfully Downloaded!"),
  });

  // Search function to filter the customer maintenance data
  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredCustomerMaintenances = data.customerMaintenances.filter((customerMaintenance) =>
        Object.values(customerMaintenance).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setCustomerMaintenances(filteredCustomerMaintenances);
      setNoResults(filteredCustomerMaintenances.length === 0);
    });
  };

  return (
    <div><Nav />
    <div className="customer-maintenance-container">
      
      <h1 className="customer-maintenance-title">Customer Maintenance Details Display Page</h1>
      <input
        className="customer-maintenance-search"
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        name="search"
        placeholder="Search Customer Maintenances Details"
      />
      <button className="customer-maintenance-search-button" onClick={handleSearch}>Search</button>

      {noResults ? (
        <div className="no-results-message">
          <p>No Customer Maintenances Found</p>
        </div>
      ) : (
        <div ref={ComponentsRef} className="customer-maintenance-list">
          {customerMaintenances &&
            customerMaintenances.map((customerMaintenance, i) => (
              <div key={i} className="customer-maintenance-item">
                <CustomerMaintenance customerMaintenance={customerMaintenance} />
              </div>
            ))}
        </div>
      )}

      <div className="customer-maintenance-actions">
        <button className="customer-maintenance-download-button" onClick={handlePrint}>
          Download Report
        </button>
      </div>
    </div>
    </div>
  );
}

export default CustomerMaintenances;
