const Employee = require("../Model/EmployeeModel");

const getAllEmployees = async (req, res, next) => {

   let Employees;
   
   try{
    employees = await Employee.find();
   }catch (err) {
    console.log(err);
   }
   //not found
   if(!employees){
    return res.status(404).json({message:"Employee not found"});
   }
   // Display all employees
   return res.status(200).json({employees});
};

// data Insert
const addEmployees = async (req, res, next) => {

    const {firstName, lastName, employeeId, age, gender, jobTitle, department, basicSal} = req.body;
    
    let employees;

    try {
        employees = new Employee({firstName, lastName, employeeId, age, gender, jobTitle, department, basicSal});
        await employees.save();
    }catch (err) {
        console.log(err);
    }
    // not insert employees
    if (!employees){
        return res.status(404).json({message:"unable to add employees"});
    }
    return res.status(200).json({ employees });
};

//Get by ID
const getById = async (req, res,next) => {

    const id = req.params.id;

    let employee;

    try {
        employee = await Employee.findById(id);
    }catch (err) {
        console.log(err);
    }
    // not available employees
    if (!employee){
        return res.status(404).json({message:"Employee Not Found"});
    }
    return res.status(200).json({ employees });
}

//Update Employee Details
const updateEmployee = async (req, res, next) => {

    const id = req.params.id;
    const {firstName, lastName, employeeId, age, gender, jobTitle, department, basicSal} = req.body;

    let employees;

    try {
        employees = await Employee.findByIdAndUpdate(id,
        { firstName: firstName, lastName: lastName, employeeId: employeeId, age: age, gender: gender, jobTitle:jobTitle, department:department, basicSal:basicSal });
        employees = await employees.save();
    }catch(err) {
        console.log(err);
    }
    if (!employees){
        return res.status(404).json({message:"Unable to Update Employee Details"});
    }
    return res.status(200).json({ employees });
};

//Delete Employee Details
const deleteEmployee = async (req, res, next) => {
   
    const id = req.params.id;

    let employee;

    try {
        employee = await Employee.findByIdAndDelete(id)
    }catch (err) {
        console.log(err);
    }
  if(!employee){
    return res.status(404).json({message:"Unable to Delete Employee Details"});
}
return res.status(200).json({ employee });
};

exports.getAllEmployees = getAllEmployees;
exports.addEmployees = addEmployees;
exports.getById = getById;
exports.updateEmployee = updateEmployee;
exports.deleteEmployee = deleteEmployee;