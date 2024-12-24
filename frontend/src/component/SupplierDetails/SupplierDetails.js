import React, { useEffect, useRef, useState } from 'react';
import Nav from "../nav/nav";
import axios from "axios";
import Supplier from "../Supplier/Supplier";
import { useReactToPrint } from "react-to-print";
import './SupplierDetails.css'; // Import the CSS file

const URL = "http://localhost:5001/suppliers";

// Fetch supplier data
const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function SupplierDetails() {
  const [suppliers, setSupplierDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => setSupplierDetails(data.suppliers));
  }, []);

  const componentsRef = useRef();
  
  // Handle printing of the supplier report
  const handlePrint = useReactToPrint({
    content: () => componentsRef.current,
    documentTitle: "SupplierDetails Report",
    onAfterPrint: () => alert("SupplierDetails Report Successfully Downloaded!"),
  });

  // Handle search functionality for suppliers
  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredSupplierDetails = data.suppliers.filter((supplier) =>
        Object.values(supplier).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setSupplierDetails(filteredSupplierDetails);
      setNoResults(filteredSupplierDetails.length === 0);
    });
  };

  // Handle WhatsApp sharing of supplier reports
  const handleSendReport = () => {
    const phoneNumber = "+94772254473"; // Example phone number
    const message = `Selected Supplier Reports`;
    const whatsappUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div><Nav />
    <div id="supplier-details-container">
      
      <h1 id="supplier-details-title">Supplier Details Display Page</h1>

      <div className="search-container">
        <input
          id="search-input"
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          name="search"
          placeholder="Search Supplier Details"
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {noResults ? (
        <div className="no-results-container">
          <p className="no-results-message">No supplier details found</p>
        </div>
      ) : (
        <div ref={componentsRef} className="results-container">
          {suppliers &&
            suppliers.map((supplier, i) => (
              <div key={i}>
                <Supplier supplier={supplier} />
              </div>
            ))}
        </div>
      )}
      <div className="button-container">
        <button
          className="download-button no-print" // Add no-print class to hide during print
          onClick={handlePrint}
        >
          Download Report
        </button>
        <button className="whatsapp-button no-print" onClick={handleSendReport}>
          Send WhatsApp Message
        </button>
      </div>
    </div>
    </div>
  );
}

export default SupplierDetails;
