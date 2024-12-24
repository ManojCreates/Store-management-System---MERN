const User = require("../Model/UserModel");

// Get All Users
const getAllUsers = async (req, res, next) => {
    let users;
    
    try {
        users = await User.find();
    } catch (err) {
        console.log(err);
    }

    // Not found
    if (!users) {
        return res.status(404).json({ message: "Users not found" });
    }

    // Display all users
    return res.status(200).json({ users });
};

// Add User
const addUsers = async (req, res, next) => {
    const { name, age,NIC, email, address, mobile,CreatePassword,ConfirmPassword } = req.body;
    
    let user;

    try {
        user = new User({ name, age,NIC, email, address, mobile,CreatePassword,ConfirmPassword });
        await user.save();
    } catch (err) {
        console.log(err);
    }

    // Failed to insert user
    if (!user) {
        return res.status(404).json({ message: "Unable to add user" });
    }

    return res.status(200).json({ user });
};

// Get User by ID
const getById = async (req, res, next) => {
    const id = req.params.id;
    
    let user;

    try {
        user = await User.findById(id);
    } catch (err) {
        console.log(err);
    }

    // User not found
    if (!user) {
        return res.status(404).json({ message: "User Not Found" });
    }

    return res.status(200).json({ user });
};

// Update User Details
const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const { name, age,NIC, email, address, mobile,CreatePassword,ConfirmPassword } = req.body;
    
    let user;

    try {
        user = await User.findByIdAndUpdate(id, {
            name,
            age,
            NIC,
            email,
            address,
            mobile,
            CreatePassword,
            ConfirmPassword
        });
        await user.save();
    } catch (err) {
        console.log(err);
    }

    // Failed to update user
    if (!user) {
        return res.status(404).json({ message: "Unable to update user details" });
    }

    return res.status(200).json({ user });
};

// Delete User
const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    
    let user;

    try {
        user = await User.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
    }

    // Failed to delete user
    if (!user) {
        return res.status(404).json({ message: "Unable to delete user" });
    }

    return res.status(200).json({ message: "User successfully deleted" });
};

exports.getAllUsers = getAllUsers;
exports.addUsers = addUsers;
exports.getById = getById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
