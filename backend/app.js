const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer"); // Import multer
const path = require("path");
const cors = require("cors");

// Import routes
const router = require("./route/productroute");
const router1 = require("./route/SupplierRouters");
const router3 = require("./route/AdminDeliveryRoute");
const router4 = require("./route/CustomerDeliveryRoute");
const router5 = require("./route/AdminMaintenanceRoute");
const router6 = require("./route/CustomerMaintenanceRoute");
const router7 = require("./route/CartRoute");
const router8 = require("./route/EmployeeRoutes");
const router9= require("./route/UserRoutes");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Route definitions
app.use("/products", router);
app.use("/customerproducts", router);
app.use("/suppliers", router1);
app.use("/AdminDeliveries", router3);
app.use("/CustomerDeliveries", router4);
app.use("/AdminMaintenances", router5);
app.use("/CustomerMaintenances", router6);
app.use("/employees", router8);
app.use("/users", router9);
app.use("/cart", router7);

// Serve files statically
app.use("/files", express.static(path.join(__dirname, '../frontend/src/component/Imguploader/files')));

// MongoDB connection
mongoose.connect("mongodb+srv://harithe:KiIPzKYY1bq4w5kT@cluster0.rxrjers.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(5001, () => console.log("Server started on port 5001"));
    })
    .catch((err) => console.log(err));

// Import and use the updated product schema
const ProductModel = require("./model/productmodel");

// Configure Multer for image storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../frontend/src/component/Imguploader/files"); // Path to store images
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage }); // Multer upload configuration

// Route to handle adding a product with image upload
app.post("/addProduct", upload.single("image"), async (req, res) => {
    const { productname, productdescription, productinventory, productprice,productsize } = req.body;
    const image = req.file.filename; // Get the filename of the uploaded image

    try {
        // Create a new product with the image
        const newProduct = new ProductModel({
            productname,
            productdescription,
            productinventory,
            productprice,
            productsize,
            image, // Save the image filename in the product model
        });

        await newProduct.save(); // Save the new product in the database
        res.json({ status: "ok", message: "Product added successfully" });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error adding product" });
    }
});

// Route to get all products with images
app.get("/getProducts", async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.json({ status: "ok", data: products });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error fetching products" });
    }
});
