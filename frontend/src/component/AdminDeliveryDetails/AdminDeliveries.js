import React, { useEffect, useState, useRef } from 'react';
import Nav from '../nav/nav';
import axios from 'axios';
import AdminDelivery from '../AdminDelivery/AdminDelivery';
import { useReactToPrint } from 'react-to-print';
import './AdminDeliveries.css';

const URL = 'http://localhost:5001/adminDeliveries';

// Fetch admin deliveries data
const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function AdminDeliveries() {
  const [adminDeliveries, setAdminDeliveries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => setAdminDeliveries(data.adminDeliveries));
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
      const filteredAdminDeliveries = data.adminDeliveries.filter((adminDelivery) =>
        Object.values(adminDelivery).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setAdminDeliveries(filteredAdminDeliveries);
      setNoResults(filteredAdminDeliveries.length === 0);
    });
  };

  // WhatsApp report sharing handler
  const handleSendReportWhatsApp = () => {
    const phoneNumber = '+94766981768'; // Example phone number
    const message = 'Selected Admin Delivery Report';
    const WhatsAppUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;
    window.open(WhatsAppUrl, '_blank');
  };

  // Email report sharing handler
  const handleSendReportEmail = () => {
    if (!adminDeliveries || adminDeliveries.length === 0) {
      alert('No admin delivery data to send!');
      return;
    }

    // Generate email body content based on admin delivery data
    const emailContent = adminDeliveries
      .map((adminDelivery) => {
        return `Delivery ID: ${adminDelivery._id}
          Request ID: ${adminDelivery.requestid}
          Customer Name: ${adminDelivery.name}
          Delivery Address: ${adminDelivery.address}
          Contact Number: ${adminDelivery.contactNumber}
          Glass Type & Size: ${adminDelivery.glasstypeandsize}
          Quantity: ${adminDelivery.quantity}
          Delivery Status: ${adminDelivery.deliverystatus}
          Assigned Driver: ${adminDelivery.assigneddriver.join(', ')}
          Delivery Date: ${new Date(adminDelivery.deliverydate).toLocaleDateString()}`;
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
      <h1 className="tt-admin-deliveries-title">Admin Delivery Details Display Page</h1>
      <input
        className="tt-search-input"
        id="tt-search-input"
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        name="tt-search"
        placeholder="Search Admin Delivery Details"
      />
      <button className="tt-search-button" onClick={handleSearch}>Search</button>

      {noResults ? (
        <div className="tt-no-results">
          <p>No Admin Deliveries Found</p>
        </div>
      ) : (
        <div ref={ComponentsRef} className="tt-delivery-list">
          {adminDeliveries &&
            adminDeliveries.map((adminDelivery, i) => (
              <div key={`admin-delivery-${i}`} className="tt-admin-delivery-item">
                <AdminDelivery adminDelivery={adminDelivery} />
              </div>
            ))}
        </div>
      )}

      <div className="tt-report-actions">
        <button className="tt-download-button" onClick={handlePrint}>Download Report</button>
        <button className="tt-whatsapp-button" onClick={handleSendReportWhatsApp}>Send WhatsApp Message</button>
        <button className="tt-email-button" onClick={handleSendReportEmail}>Send Email</button>
      </div>
    </div>
  );
}

export default AdminDeliveries;
