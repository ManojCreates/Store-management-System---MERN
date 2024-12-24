const CustomerMaintenance = require("../Model/CustomerMaintenanceModel");

// Get all customer maintenances
const getAllCustomerMaintenances = async (req, res, next) => {
    let CustomerMaintenances;
    try {
        customerMaintenances = await CustomerMaintenance.find();
    } catch (err) {
        console.log(err);
    }

    if (!customerMaintenances) {
        return res.status(404).json({ message: "No requests found" });
    }

    return res.status(200).json({ customerMaintenances });
};

// Add a customer maintenance request
const addCustomerMaintenances = async (req, res, next) => {
    const { name, contactNumber, email, address, serviceType, glassType, dimensions, issueDescription, preferredServiceDate } = req.body;
    let customerMaintenances;

    try {
        customerMaintenances = new CustomerMaintenance({
            name, contactNumber, email, address, serviceType, glassType, dimensions, issueDescription, preferredServiceDate
        });
        await customerMaintenances.save();
    } catch (err) {
        console.log(err);
    }

    // not add requests
    if (!customerMaintenances){
        return res.status(404).json({message:"unable to add requests"});
    }
    return res.status(200).json({ customerMaintenances });
};

// Get a customer maintenance request by ID
const getByCustomerMaintenanceId = async (req, res, next) => {
    const id = req.params.id;
    let customerMaintenance;

    try {
        customerMaintenance = await CustomerMaintenance.findById(id);
    } catch (err) {
        console.log(err);
    }

    // not available requests
    if (!customerMaintenance) {
        return res.status(404).json({ message: "Request not found" });
    }

    return res.status(200).json({ customerMaintenance });
}

// Update a customer maintenance request by ID
const updateCustomerMaintenance = async (req, res, next) => {
    const id = req.params.id;
    const { name, contactNumber, email, address, serviceType, glassType, dimensions, issueDescription, preferredServiceDate } = req.body;
    let customerMaintenances;

    try {
        customerMaintenances = await CustomerMaintenance.findByIdAndUpdate(
            id,
            { name:name, contactNumber:contactNumber, email:email, address:address, serviceType:serviceType, glassType:glassType, dimensions:dimensions, issueDescription:issueDescription, preferredServiceDate:preferredServiceDate });
            customerMaintenances = await customerMaintenances.save();
    } catch (err) {
        console.log(err);
    }

    if (!customerMaintenances) {
        return res.status(404).json({ message: "Unable to Update Requests" });
    }

    return res.status(200).json({ customerMaintenances });
};

// Delete a customer maintenance request by ID
const deleteCustomerMaintenance = async (req, res, next) => {
    const id = req.params.id;
    let customerMaintenance;

    try {
        customerMaintenance = await CustomerMaintenance.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
    }

    if (!customerMaintenance) {
        return res.status(404).json({ message: "Unable to Delete Request" });
    }

    return res.status(200).json({ customerMaintenance });
};


exports.getAllCustomerMaintenances = getAllCustomerMaintenances;
exports.addCustomerMaintenances = addCustomerMaintenances;
exports.getByCustomerMaintenanceId = getByCustomerMaintenanceId;
exports.updateCustomerMaintenance = updateCustomerMaintenance;
exports.deleteCustomerMaintenance = deleteCustomerMaintenance;
