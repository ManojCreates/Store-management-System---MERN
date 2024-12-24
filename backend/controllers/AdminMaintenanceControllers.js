const AdminMaintenance = require("../Model/AdminMaintenanceModel");

// Get all admin maintenances
const getAllAdminMaintenances = async (req, res, next) => {
    let adminMaintenances;
    try {
        adminMaintenances = await AdminMaintenance.find();
    } catch (err) {
        console.log(err);
    }

    if (!adminMaintenances) {
        return res.status(404).json({ message: "No requests found" });
    }

    return res.status(200).json({ adminMaintenances });
};

// Add a admin maintenance request
const addAdminMaintenances = async (req, res, next) => {
    const { name,contactNumber,address,typeofservice,glasstype,size,issueDescription,requeststatus,assignedtechnician,scheduleddate } = req.body;
    let adminMaintenances;

    try {
        adminMaintenances = new AdminMaintenance({
            name,contactNumber,address,typeofservice,glasstype,size,issueDescription,requeststatus,assignedtechnician,scheduleddate
        });
        await adminMaintenances.save();
    } catch (err) {
        console.log(err);
    }

    // not add requests
    if (!adminMaintenances){
        return res.status(404).json({message:"unable to add requests"});
    }
    return res.status(200).json({ adminMaintenances });
};

// Get a admin maintenance request by ID
const getByAdminMaintenanceId = async (req, res, next) => {
    const id = req.params.id;
    let adminMaintenance;

    try {
        adminMaintenance = await AdminMaintenance.findById(id);
    } catch (err) {
        console.log(err);
    }

    // not available requests
    if (!adminMaintenance) {
        return res.status(404).json({ message: "Request not found" });
    }

    return res.status(200).json({ adminMaintenance });
}

// Update a admin maintenance request by ID
const updateAdminMaintenance = async (req, res, next) => {
    const id = req.params.id;
    const { name,contactNumber,address,typeofservice,glasstype,size,issueDescription,requeststatus,assignedtechnician,scheduleddate } = req.body;
    let adminMaintenances;

    try {
        adminMaintenances = await AdminMaintenance.findByIdAndUpdate(
            id,
            { name:name, contactNumber:contactNumber, address:address, typeofservice:typeofservice, glasstype:glasstype, size:size, issueDescription:issueDescription, requeststatus:requeststatus,  assignedtechnician:assignedtechnician, scheduleddate:scheduleddate },
        { new: true }
    );
    } catch (err) {
        console.log(err);
    }

    if (!adminMaintenances) {
        return res.status(404).json({ message: "Unable to Update Requests" });
    }

    return res.status(200).json({ adminMaintenances });
};

// Delete a admin maintenance request by ID
const deleteAdminMaintenance = async (req, res, next) => {
    const id = req.params.id;
    let adminMaintenance;

    try {
        adminMaintenance = await AdminMaintenance.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
    }

    if (!adminMaintenance) {
        return res.status(404).json({ message: "Unable to Delete Request" });
    }

    return res.status(200).json({ adminMaintenance });
};

exports.getAllAdminMaintenances = getAllAdminMaintenances;
exports.addAdminMaintenances = addAdminMaintenances;
exports.getByAdminMaintenanceId = getByAdminMaintenanceId;
exports.updateAdminMaintenance = updateAdminMaintenance;
exports.deleteAdminMaintenance = deleteAdminMaintenance;
