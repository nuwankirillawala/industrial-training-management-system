const Admin = require('../models/Admin');
const Undergraduate = require('../models/Undergraduate');
const Alumni = require('../models/Alumni');
const Supervisor = require('../models/Supervisor');
const handleErrors = require('../utils/appErrors');

//select UserSchema by user type
const User = (userType) => {
        switch (userType) {
            case "admin":
                return Admin;
            case "undergraduate":
                return Undergraduate;
            case "supervisor":
                return Supervisor;
            case "alumni":
                return Alumni;
            default:
                return undefined;
        }
}

//View all users by user type
module.exports.viewAllUsers_get = async (req, res) => {
    try {
        const userType = req.params.userType;
        let users = "";

        switch (userType) {
            case "admin":
                users = await Admin.find();
                break;
            case "undergraduate":
                users = await Undergraduate.find();
                break;
            case "supervisor":
                users = await Supervisor.find();
                break;
            case "alumni":
                users = await Alumni.find();
                break;
            default:
                users = undefined;
                break;
        }
        console.log(users);
        res.status(200).json({ users });
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Server error"});
    }
}

//search users
module.exports.searchUsers_get = async (req, res) =>{
    try {
        const userType = req.params.userType;
        const searchTerm = req.query.q;
        const searchBy = req.query.searchBy;
        let User;
        switch (userType) {
            case "admin":
                User = Admin;
                break;
            case "undergraduate":
                User = Undergraduate;
                break;
            case "supervisor":
                User = Supervisor;
                break;
            case "alumni":
                User = Alumni;
                break;
            default:
                User = undefined;
                break;
        }
        
    } catch (err) {
        
    }
}