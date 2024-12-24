const AdminDelivery = require("../Model/AdminDeliveryModel");

// Get all admin deliveries
const getAllAdminDeliveries = async (req, res, next) => {
    let adminDeliveries;
    try {
        adminDeliveries = await AdminDelivery.find();
    } catch (err) {
        console.log(err);
    }

    if (!adminDeliveries) {
        return res.status(404).json({ message: "No requests found" });
    }

    return res.status(200).json({ adminDeliveries });
};

// Add a admin delivery request
const addAdminDeliveries = async (req, res, next) => {
    const { name,contactNumber,address,glasstypeandsize,quantity,specialInstructions,deliverystatus,assigneddriver,deliverydate } = req.body;
    let adminDeliveries;

    try {
        adminDeliveries = new AdminDelivery({
            name,contactNumber,address,glasstypeandsize,quantity,specialInstructions,deliverystatus,assigneddriver,deliverydate
        });
        await adminDeliveries.save();
    } catch (err) {
        console.log(err);
    }

    // not add requests
    if (!adminDeliveries){
        return res.status(404).json({message:"unable to add requests"});
    }
    return res.status(200).json({ adminDeliveries });
};

// Get a admin delivery request by ID
const getByAdminDeliveryId = async (req, res, next) => {
    const id = req.params.id;
    let adminDelivery;

    try {
        adminDelivery = await AdminDelivery.findById(id);
    } catch (err) {
        console.log(err);
    }

    // not available requests
    if (!adminDelivery) {
        return res.status(404).json({ message: "Request not found" });
    }

    return res.status(200).json({ adminDelivery });
}

// Update a admin delivery request by ID
const updateAdminDelivery = async (req, res, next) => {
    const id = req.params.id;
    const { name,contactNumber,address,glasstypeandsize,quantity,specialInstructions,deliverystatus,assigneddriver,deliverydate } = req.body;
    let adminDeliveries;

    try {
        adminDeliveries = await AdminDelivery.findByIdAndUpdate(
            id,
            { name:name, contactNumber:contactNumber, address:address, glasstypeandsize:glasstypeandsize, quantity:quantity, specialInstructions:specialInstructions, deliverystatus:deliverystatus,assigneddriver:assigneddriver, deliverydate:deliverydate },
        { new: true }
    );
    } catch (err) {
        console.log(err);
    }

    if (!adminDeliveries) {
        return res.status(404).json({ message: "Unable to Update Requests" });
    }

    return res.status(200).json({ adminDeliveries });
};

// Delete a admin delivery request by ID
// Delete an admin delivery request by ID
const deleteAdminDelivery = async (req, res, next) => {
    const id = req.params.id;
    let adminDelivery;

    try {
        // Correctly reference the AdminDelivery model to delete the document by ID
        adminDelivery = await AdminDelivery.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server Error: Unable to Delete Request" });
    }

    if (!adminDelivery) {
        return res.status(404).json({ message: "Request not found or unable to delete" });
    }

    return res.status(200).json({ message: "Request successfully deleted" });
};


exports.getAllAdminDeliveries = getAllAdminDeliveries;
exports.addAdminDeliveries = addAdminDeliveries;
exports.getByAdminDeliveryId = getByAdminDeliveryId;
exports.updateAdminDelivery = updateAdminDelivery;
exports.deleteAdminDelivery = deleteAdminDelivery;
