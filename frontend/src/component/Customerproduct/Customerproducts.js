import React, { useEffect, useState, useRef } from 'react';
import Nav from '../nav/customernav';
import axios from 'axios';
import CustomerProduct from '../Customerproduct/Customerproduct';
import './customerProducts.css';

const URL = "http://localhost:5001/customerproducts";

// Function to fetch products data
const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function CustomerProducts() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch products on component mount
  useEffect(() => {
    fetchHandler().then((data) => {
      console.log("Fetched customer products:", data);
      setProducts(data.products);
      setFilteredProducts(data.products); // Set initial filtered products
    });
  }, []);

  // Handle search query to filter products
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = products.filter((product) =>
      Object.values(product).some((field) =>
        field.toString().toLowerCase().includes(query.toLowerCase())
      )
    );

    setFilteredProducts(filtered); // Update filtered products based on query
    setNoResults(filtered.length === 0);
  };

  return (
    <div className="customer-products">
      <Nav />
      <div className="products-container">
        <h1 className="products-heading">Explore Our Products</h1>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            name="search"
            placeholder="Search Products"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        {/* Display message if no results found */}
        {noResults ? (
          <div className="no-results">
            <p>No Products Found</p>
          </div>
        ) : (
          // Product List
          <div className="product-list">
            {filteredProducts.map((product, i) => (
              <CustomerProduct key={i} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerProducts;
