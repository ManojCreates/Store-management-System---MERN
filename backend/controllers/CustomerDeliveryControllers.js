const CustomerDelivery = require("../Model/CustomerDeliveryModel");

// Get all customer Delivery
const getAllCustomerDelivery = async (req, res, next) => {
    let CustomerDeliveries;
    try {
        customerDeliveries = await CustomerDelivery.find();
    } catch (err) {
        console.log(err);
    }

    if (!customerDeliveries) {
        return res.status(404).json({ message: "No requests found" });
    }

    return res.status(200).json({ customerDeliveries });
};

// Add a customer delivery request
const addCustomerDelivery = async (req, res, next) => {
    const { name, contactNumber, email, address, glassType, quantity, specialInstructions,preferredDeliveryDate } = req.body;
    let customerDeliveries;

    try {
        customerDeliveries = new CustomerDelivery({
            name, contactNumber, email, address, glassType,quantity, specialInstructions, preferredDeliveryDate
        });
        await customerDeliveries.save();
    } catch (err) {
        console.log(err);
    }

    // not add requests
    if (!customerDeliveries){
        return res.status(404).json({message:"unable to add requests"});
    }
    return res.status(200).json({ customerDeliveries });
};

// Get a customer delivery request by ID
const getByCustomerDeliveryId = async (req, res, next) => {
    const id = req.params.id;
    let customerDelivery;

    try {
        customerDelivery = await CustomerDelivery.findById(id);
    } catch (err) {
        console.log(err);
    }

    // not available requests
    if (!customerDelivery) {
        return res.status(404).json({ message: "Request not found" });
    }

    return res.status(200).json({ customerDeliveries });
}

// Update a customer delivery request by ID
const updateCustomerDelivery= async (req, res, next) => {
    const id = req.params.id;
    const {name, contactNumber, email, address, glassType, quantity, specialInstructions, preferredDeliveryDate } = req.body;
    let customerDeliveries;

    try {
        customerDeliveries = await CustomerDelivery.findByIdAndUpdate(
            id,
            { name:name, contactNumber:contactNumber, email:email, address:address, glassType:glassType, quantity:quantity ,specialInstructions:specialInstructions, preferredDeliveryDate:preferredDeliveryDate });
            customerDeliveries = await customerDeliveries.save();
    } catch (err) {
        console.log(err);
    }

    if (!customerDeliveries) {
        return res.status(404).json({ message: "Unable to Update Requests" });
    }

    return res.status(200).json({ customerDeliveries });
};

// Delete a customer delivery request by ID
const deleteCustomerDelivery = async (req, res, next) => {
    const id = req.params.id;
    let customerDelivery;

    try {
        customerDelivery = await CustomerDelivery.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
    }

    if (!customerDelivery) {
        return res.status(404).json({ message: "Unable to Delete Request" });
    }

    return res.status(200).json({ customerDelivery });
};


exports.getAllCustomerDelivery = getAllCustomerDelivery;
exports.addCustomerDelivery = addCustomerDelivery;
exports.getByCustomerDeliveryId = getByCustomerDeliveryId;
exports.updateCustomerDelivery = updateCustomerDelivery;
exports.deleteCustomerDelivery = deleteCustomerDelivery;
