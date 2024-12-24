const Supplier = require ("../model/SupplierModel");

//Data display
const getAllSuppliers = async (req,res,next) => {
let Suppliers;
//get all Supplier
try{
    suppliers = await Supplier.find();
}catch (err) {
    console.log(err);
}
// not found
if (!suppliers){
    return res.status(404).json({message: "Supplier not found"});
}
//Display all suppliers
    return res.status(200).json({suppliers});
};

//Data Insert
const addSuppliers = async (req,res,next) => {
    const {SupplierName,ContactPerson,SupplierEmail,SupplierPhoneNumber,SupplierAddress,SupplierProducts,SupplierRating} = req.body;
    let suppliers;
    try{
        suppliers = new Supplier({SupplierName,ContactPerson,SupplierEmail,SupplierPhoneNumber,SupplierAddress,SupplierProducts,SupplierRating});
        await suppliers.save();
    }catch(err){
        console.log(err);
    }
//not insert suppliers
    if (!suppliers){
        return res.status(404).json({message:"unable to add suppliers"});
    }
    return res.status(200).json({suppliers});
};

//Get by ID
const getById = async (req,res,next)=> {
    const id = req.params.id;
    let supplier;
try{
    supplier = await Supplier.findById(id);
}catch (err){
    console.log(err);
}
//not available suppliers
if (!suppliers){
    return res.status(404).json({message:"Suppliers notfound"});
}
return res.status(200).json({suppliers});
}

//update supplier details
const updateSupplier = async(req, res, next)=>{
    const id = req.params.id;
    const {SupplierName,ContactPerson,SupplierEmail,SupplierPhoneNumber,SupplierAddress,SupplierProducts,SupplierRating} = req.body;
    let suppliers;
    try{
        suppliers = await Supplier.findByIdAndUpdate(id,
            {SupplierName:SupplierName,ContactPerson:ContactPerson,SupplierEmail:SupplierEmail,SupplierPhoneNumber:SupplierPhoneNumber,SupplierAddress:SupplierAddress,SupplierProducts:SupplierProducts,SupplierRating:SupplierRating });
            suppliers = await suppliers.save();
    }catch(err){
    console.log(err);
    }
//unable to update suppliers
    if(!suppliers){
        return res.status(404).json({message:"unable to update suppliers details"});
    }
    return res.status(200).json({suppliers});
};

//Delete supplier detailsb 
const deleteSupplier = async(req, res, next)=>{
    const id = req.params.id;
    let supplier;
    try{
        supplier = await Supplier.findByIdAndDelete(id)
    }catch(err){
    console.log(err);
    }
//unable to delete suppliers
    if(!supplier){
        return res.status(404).json({message: "unable to delete supplier details"});
    }
    return res.status(200).json({supplier});
};

exports.getAllSuppliers= getAllSuppliers;
exports.addSuppliers= addSuppliers;
exports.getById= getById;
exports.updateSupplier=updateSupplier; 
exports.deleteSupplier=deleteSupplier;