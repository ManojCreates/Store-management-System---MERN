import React, { useEffect, useState, useRef } from 'react';
import Nav from '../nav/nav';
import axios from 'axios';
import Product from '../Product/Product';
import { useReactToPrint } from 'react-to-print';
import './Products.css';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Modal from 'react-modal';

// Register chart components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    height: '70%',
    overflow: 'auto',
    padding: '20px',
  },
};

const URL = "http://localhost:5001/products";

// Function to fetch products data
const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function Products() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => setProducts(data.products));
  }, []);

  const componentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentsRef.current,
    documentTitle: "Inventory Report",
    onAfterPrint: () => {
      alert("Report successfully downloaded");
    },
  });

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredProducts = data.products.filter((product) =>
        Object.values(product).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setProducts(filteredProducts);
      setNoResults(filteredProducts.length === 0);
    });
  };

  // Enhanced chart data
  const chartData = {
    labels: products.map((p) => p.productname),
    datasets: [
      {
        label: 'Inventory Level',
        data: products.map((p) => p.productinventory),
        backgroundColor: products.map((p) =>
          p.productinventory <= 5 ? 'rgba(255, 99, 132, 0.6)' : 'rgba(75, 192, 192, 0.6)'
        ),
        borderColor: products.map((p) =>
          p.productinventory <= 5 ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 1)'
        ),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Product Inventory Trends',
        font: {
          size: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Inventory: ${context.raw}`;
          },
        },
      },
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Product Name',
          font: {
            size: 14,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Inventory Level',
          font: {
            size: 14,
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  return (
    <div className="admin-customer-products">
      <Nav />
      <div className="admin-products-container">
        <h1 className="admin-products-heading">Product Details</h1>

        {/* Search Bar */}
        <div className="admin-search-bar">
          <input
            type="text"
            name="search"
            placeholder="Search Products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="admin-search-button" onClick={handleSearch}>
            Search

          </button>
        </div>

        {/* Display message if no results found */}
        {noResults ? (
          <div className="admin-no-results">
            <p>No Products Found</p>
          </div>
        ) : (
          <div ref={componentsRef} className="admin-print-container">
            <div className="admin-report-header admin-print-only">
              <h2>Lanka Glass House Inventory Report</h2>
              <p>Generated on: {new Date().toLocaleDateString()}</p>
            </div>
            <div className="admin-product-list">
              {products.map((product, i) => (
                <div key={i} className="admin-product-card">
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Button container for printing report and viewing trends */}
        <div className="admin-button-container">
          <button className="admin-report-button" onClick={handlePrint}>
            Download Report
          </button>

          <button
            className="admin-trends-button"
            onClick={() => setIsModalOpen(true)}
          >
            View Trends
          </button>
        </div>

        {/* Modal for the chart */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          style={modalStyles}
          contentLabel="Inventory Trends"
          ariaHideApp={false}
        >
          <h2>Inventory Trends</h2>
          {/* Bar Chart with enhanced details */}
          <Bar data={chartData} options={chartOptions} />
          {/* Close button */}
          <button className="admin-close-modal-button" onClick={() => setIsModalOpen(false)}>Close</button>
        </Modal>
      </div>
    </div>
  );
}

export default Products;
