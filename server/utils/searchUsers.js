const Admin = require('../models/Admin');
const Undergraduate = require('../models/Undergraduate');
const Alumni = require('../models/Alumni');
const Supervisor = require('../models/Supervisor');

const searchUsers = async (searchBy, userType, searchTerm) => {
    let users;

    if (userType === "admin") {
        users = await Admin.find({ [searchBy]: { $regex: searchTerm, $options: 'i' } });
    }
    else if (userType === "undergraduate") {
        users = await Undergraduate.find({ [searchBy]: { $regex: searchTerm, $options: 'i' } });
    }
    else if (userType === "supervisor") {
        users = await Supervisor.find({ [searchBy]: { $regex: searchTerm, $options: 'i' } });
    }
    else if (userType === "alumni") {
        users = await Alumni.find({ [searchBy]: { $regex: searchTerm, $options: 'i' } });
    } 
    else {
        console.log("Invalid user type");
    }

    return users;
}

module.exports = searchUsers;