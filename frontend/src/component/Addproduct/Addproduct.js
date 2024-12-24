import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from "../nav/nav";
import "./Addproduct.css";

function Addproduct() {
  const history = useNavigate();
  
  // Form fields state
  const [inputs, setInputs] = useState({
    productname: "",
    productdescription: "",
    productinventory: "",
    productprice: "",
    productsize: "", // Include product size in the state
  });

  // Image state
  const [image, setImage] = useState(null);

  const [errors, setErrors] = useState({});

  // Handle input changes for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "productinventory" || name === "productprice") {
      // Allow numeric input only for product inventory and price fields
      if (value === "" || /^\d*\.?\d*$/.test(value)) {
        setInputs((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        setErrors((prevState) => ({
          ...prevState,
          [name]: "",
        }));
      }
    } else if (name === "productname" || name === "productdescription") {
      // Allow only letters and spaces for product name and description
      if (/^[a-zA-Z\s]*$/.test(value)) {
        setInputs((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        setErrors((prevState) => ({
          ...prevState,
          [name]: "",
        }));
      }
    } else {
      // Allow letters and numbers for product size or other fields
      setInputs((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      setErrors((prevState) => ({
        ...prevState,
        [name]: "",
      }));  
    }
  };

  // Handle image change
  const onImgChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Validate form inputs
  const validate = () => {
    let tempErrors = {};
    if (!inputs.productname) {
      tempErrors.productname = "Product name is required.";
    } else if (inputs.productname.length < 3) {
      tempErrors.productname = "Product name must be at least 3 characters.";
    }

    if (!inputs.productdescription) {
      tempErrors.productdescription = "Product description is required.";
    } else if (inputs.productdescription.length < 10) {
      tempErrors.productdescription = "Product description must be at least 10 characters.";
    }

    if (!inputs.productsize) {
      tempErrors.productsize = "Product size is required.";
    }

    if (!inputs.productinventory) {
      tempErrors.productinventory = "Product inventory is required.";
    } else if (isNaN(inputs.productinventory) || inputs.productinventory <= 0) {
      tempErrors.productinventory = "Product inventory must be a positive number.";
    }

    if (!inputs.productprice) {
      tempErrors.productprice = "Product price is required.";
    } else if (isNaN(inputs.productprice) || inputs.productprice <= 0) {
      tempErrors.productprice = "Product price must be a positive number.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      sendRequest().then(() => history('/productdetails'));
    }
  };

  // Send request to server (with image and product data)
  const sendRequest = async () => {
    const formData = new FormData();
    formData.append("productname", inputs.productname);
    formData.append("productdescription", inputs.productdescription);
    formData.append("productinventory", inputs.productinventory);
    formData.append("productprice", inputs.productprice);
    formData.append("productsize", inputs.productsize); // Ensure product size is included
    formData.append("image", image); // Attach the image to the form data

    try {
      const response = await axios.post("http://localhost:5001/addProduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  return (
    <div>
      <Nav />
      <div className="addproduct-container">
        <h1>Add Products</h1>
        <form onSubmit={handleSubmit} className="addproduct-form">
          <label>Product Name:</label>
          <br />
          <input
            type="text"
            name="productname"
            onChange={handleChange}
            value={inputs.productname}
            required
          />
          {errors.productname && <span className="error">{errors.productname}</span>}
          <br />
          <label>Product Description:</label>
          <br />
          <input
            type="text"
            name="productdescription"
            onChange={handleChange}
            value={inputs.productdescription}
            required
          />
          {errors.productdescription && <span className="error">{errors.productdescription}</span>}
          <br />
          <label>Product Size:</label>
          <br />
          {/* Dropdown for product size */}
          <select
            name="productsize"
            onChange={handleChange}
            value={inputs.productsize}
            required
          >
            <option value="">Select Size</option>
            <option value="12X12  12mm">12X12  12mm</option>
    <option value="20X20  12mm">20X20  12mm</option>
    <option value="25X25  20mm">25X25  20mm</option>
    <option value="30X30  20mm">30X30  20mm</option>
    <option value="40X40  12mm">40X40  12mm</option>
    <option value="50X50  12mm">50X50  12mm</option>
    <option value="60X60  15mm">60X60  15mm</option>
    <option value="80X80  15mm">80X80  15mm</option>
    <option value="100X100  20mm">100X100  20mm</option>
    <option value="120X120  20mm">120X120  20mm</option>
    <option value="150X150  25mm">150X150  25mm</option>
    <option value="200X200  25mm">200X200  25mm</option>
    <option value="250X250  30mm">250X250  30mm</option>
    <option value="300X300  30mm">300X300  30mm</option>
          </select>
          {errors.productsize && <span className="error">{errors.productsize}</span>}
          <br />
          <label>Product Inventory:</label>
          <br />
          <input
            type="number"
            name="productinventory"
            onChange={handleChange}
            value={inputs.productinventory}
            required
          />
          {errors.productinventory && <span className="error">{errors.productinventory}</span>}
          <br />
          <label>Product Price:</label>
          <br />
          <input
            type="number"
            name="productprice"
            onChange={handleChange}
            value={inputs.productprice}
            required
          />
          {errors.productprice && <span className="error">{errors.productprice}</span>}
          <br />
          <label>Product Image:</label>
          <br />
          <input
            type="file"
            accept="image/*"
            onChange={onImgChange}
            required
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Addproduct;
