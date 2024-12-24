import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Updateproducts.css';

function ProductDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product; // Access the passed product details
  const [formData, setFormData] = useState({
    productname: '',
    productdescription: '',
    productinventory: '',
    productprice: '',
    image: ''
  });
  
  const [errors, setErrors] = useState({});

  // Set form data with product details when the component mounts
  useEffect(() => {
    if (product) {
      setFormData({
        productname: product.productname,
        productdescription: product.productdescription,
        productinventory: product.productinventory,
        productprice: product.productprice,
        image: product.image
      });
    }
  }, [product]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "productinventory" || name === "productprice") {
      if (value === "" || /^\d*\.?\d*$/.test(value)) {
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        setErrors((prevState) => ({
          ...prevState,
          [name]: "",
        }));
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      setErrors((prevState) => ({
        ...prevState,
        [name]: "",
      }));
    }
  };

  // Validate form inputs
  const validate = () => {
    let tempErrors = {};
    if (!formData.productname) {
      tempErrors.productname = "Product name is required.";
    } else if (formData.productname.length < 3) {
      tempErrors.productname = "Product name must be at least 3 characters.";
    }

    if (!formData.productdescription) {
      tempErrors.productdescription = "Product description is required.";
    } else if (formData.productdescription.length < 10) {
      tempErrors.productdescription = "Product description must be at least 10 characters.";
    }

    if (!formData.productinventory) {
      tempErrors.productinventory = "Product inventory is required.";
    } else if (isNaN(formData.productinventory) || formData.productinventory <= 0) {
      tempErrors.productinventory = "Product inventory must be a positive number.";
    }

    if (!formData.productprice) {
      tempErrors.productprice = "Product price is required.";
    } else if (isNaN(formData.productprice) || formData.productprice <= 0) {
      tempErrors.productprice = "Product price must be a positive number.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle form submission to update the product
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await axios.put(`http://localhost:5001/products/${product._id}`, formData);
        alert("Product updated successfully!");
        navigate("/productdetails");  // Redirect to product list page
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
  };

  return (
    <div className="update-product-container">
      <h1 className="update-product-heading">Update Product Details</h1>
      <form className="update-product-form" onSubmit={handleSubmit}>
        <label className="update-product-label">
          Product Name:
          <input
            type="text"
            name="productname"
            className="update-product-input"
            value={formData.productname}
            onChange={handleChange}
            required
          />
          {errors.productname && <span className="error">{errors.productname}</span>}
        </label>
        <br />
        <label className="update-product-label">
          Product Description:
          <input
            type="text"
            name="productdescription"
            className="update-product-input"
            value={formData.productdescription}
            onChange={handleChange}
            required
          />
          {errors.productdescription && <span className="error">{errors.productdescription}</span>}
        </label>
        <br />
        <label className="update-product-label">
          Product Inventory:
          <input
            type="number"
            name="productinventory"
            className="update-product-input"
            value={formData.productinventory}
            onChange={handleChange}
            required
          />
          {errors.productinventory && <span className="error">{errors.productinventory}</span>}
        </label>
        <br />
        <label className="update-product-label">
          Product Price:
          <input
            type="number"
            name="productprice"
            className="update-product-input"
            value={formData.productprice}
            onChange={handleChange}
            required
          />
          {errors.productprice && <span className="error">{errors.productprice}</span>}
        </label>
        <br />
        <button type="submit" className="update-product-button">Update Product</button>
      </form>
    </div>
  );
}

export default ProductDetails;
