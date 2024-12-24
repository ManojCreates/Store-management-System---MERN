import React, { useEffect, useState, useRef } from 'react';
import Nav from '../nav/nav';
import axios from 'axios';
import CustomerDelivery from '../CustomerDelivery/CustomerDelivery';
import { useReactToPrint } from 'react-to-print';
import './CustomerDeliveries.css';

const URL = 'http://localhost:5001/customerDeliveries';

// Fetch customer deliveries data
const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function CustomerDeliveries() {
  const [customerDeliveries, setCustomerDeliveries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => setCustomerDeliveries(data.customerDeliveries));
  }, []);

  // Printing the report
  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: 'LANKA GLASS HOUSE Delivery Report',
    onAfterPrint: () => alert('LANKA GLASS HOUSE Delivery Report Successfully Downloaded!'),
  });

  // Search handler
  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredCustomerDeliveries = data.customerDeliveries.filter((customerDelivery) =>
        Object.values(customerDelivery).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setCustomerDeliveries(filteredCustomerDeliveries);
      setNoResults(filteredCustomerDeliveries.length === 0);
    });
  };

  // WhatsApp report sharing handler
  const handleSendReportWhatsApp = () => {
    const phoneNumber = '+94766981768'; // Example phone number
    const message = 'Selected Customer Delivery Report';
    const WhatsAppUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;
    window.open(WhatsAppUrl, '_blank');
  };

  // Email report sharing handler
  const handleSendReportEmail = () => {
    if (!customerDeliveries || customerDeliveries.length === 0) {
      alert('No customer delivery data to send!');
      return;
    }

    // Generate email body content based on customer delivery data
    const emailContent = customerDeliveries
      .map((customerDelivery) => {
        return `
          Delivery ID: ${customerDelivery._id}
          Customer Name: ${customerDelivery.name}
          Delivery Address: ${customerDelivery.address}
          Contact Number: ${customerDelivery.contactNumber}
          Delivery Date: ${new Date(customerDelivery.deliveryDate).toLocaleDateString()}
          Delivery Status: ${customerDelivery.status}
        `;
      })
      .join('\n\n');

    // Create a mailto link
    const subject = 'LANKA GLASS HOUSE Delivery Report';
    const body = encodeURIComponent(emailContent);
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${body}`;

    // Open the user's email client with the report pre-filled
    window.open(mailtoLink, '_blank');
  };

  return (
    <div>
      <Nav />
      <div className="uu-customer-deliveries-container">
        <h1 className="uu-deliveries-title">Customer Delivery Details Display Page</h1>

        {/* Search Input */}
        <input
          className="uu-search-input"
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          name="search"
          placeholder="Search Customer Delivery Details"
        />
        <button className="uu-search-button" onClick={handleSearch}>Search</button>

        {/* Conditional Rendering for Search Results */}
        {noResults ? (
          <div className="uu-no-results">
            <p>No Customer Deliveries Found</p>
          </div>
        ) : (
          <div className="uu-customer-delivery-list" ref={ComponentsRef}>
            {customerDeliveries &&
              customerDeliveries.map((customerDelivery, i) => (
                <div className="uu-customer-delivery-item" key={i}>
                  <CustomerDelivery customerDelivery={customerDelivery} />
                </div>
              ))}
          </div>
        )}

        {/* Report Actions */}
        <div className="uu-report-actions">
          <button className="uu-download-button" onClick={handlePrint}>Download Report</button>
          <button className="uu-whatsapp-button" onClick={handleSendReportWhatsApp}>Send WhatsApp Message</button>
          <button className="uu-email-button" onClick={handleSendReportEmail}>Send Email</button>
        </div>
      </div>
    </div>
  );
}

export default CustomerDeliveries;
