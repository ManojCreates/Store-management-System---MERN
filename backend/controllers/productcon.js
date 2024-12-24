const product = require("../model/productmodel");

//display
const getallproduct = async (req, res, next) => {

    let products;
    
    //get
    try{
        products = await product.find();
    }catch (err){
        console.log(err);
    }
    if(!products){
        return res.status(404).json({message:"Product not found"});
    }

    //display
    return res.status(200).json({products});

};

//insert
const insertproduct = async (req, res, next) => {

    const {productname,productdescription,productinventory,productprice,productsize} = req.body;

    let products;

    try{
        products= new product({productname,productdescription,productinventory,productprice,productsize});
        await products.save();
    }catch(err){
        console.log(err);
    }
    if(!products){
        return res.status(404).send({message:"unable to add product"});
    }

    return res.status(200).json({products});
    
};

//getid
const getproductid = async (req, res, next) => {
    const id = req.params.id;

    let products;//have to be unique always

    try{
        products = await product.findById(id);
    }catch(err){
        console.log(err);
    }
    if(!products){
        return res.status(404).send({message:"unable to find product"});
    }

    return res.status(200).json({products});


};

//update
const updateproduct = async (req, res, next) => {
    const id = req.params.id;
    const {productname,productdescription,productinventory,productprice,productsize} = req.body;

    let products;

    try{
        products=await product.findByIdAndUpdate(id,{productname:productname,productdescription:productdescription,productinventory:productinventory,productprice:productprice,productsize:productsize});
        products=await products.save();
    }catch(err){
        console.log(err);
    }

    if(!products){
        return res.status(404).send({message:"unable to update product"});
    }

    return res.status(200).json({products});
};

//delete
const deleteproduct = async (req, res, next) => {
    const id = req.params.id;
    const {productname,productdescription,productinventory,productprice,productsize} = req.body;

    let products;

    try{
        products=await product.findByIdAndDelete(id,{productname:productname,productdescription:productdescription,productinventory:productinventory,productprice:productprice,productsize:productsize});
        products=await products.save();
    }catch(err){
        console.log(err);
    }

    if(!products){
        return res.status(404).send({message:"unable to delete product"});
    }

    return res.status(200).json({products});
}

exports.getallproduct=getallproduct;
exports.insertproduct=insertproduct;
exports.getproductid=getproductid;
exports.updateproduct=updateproduct;
exports.deleteproduct=deleteproduct;