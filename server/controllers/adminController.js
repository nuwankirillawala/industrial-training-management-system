const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Undergraduate = require('../models/Undergraduate');
const Alumni = require('../models/Alumni');
const Supervisor = require('../models/Supervisor');
const handleErrors = require('../utils/appErrors');

//route handlers
module.exports.createUser_get = (req, res) => {
    const userType = req.params.userType;
    res.send(`Create ${userType} form`);
}

//create users - all types
module.exports.createUser_post = async (req, res) => {
    const userType = req.params.userType;
    if (userType === 'admin') {
        const { adminRole, name, email, contactNo, staffId, password } = req.body;

        try {
            const admin = await Admin.create({ adminRole, name, email, contactNo, staffId, password });
            res.status(201).json({ admin: admin._id });

        } catch (err) {
            const errors = handleErrors(err);
            console.log({ errors });
            res.status(400).json({ errors });
        }
    }
    else if (userType === 'undergraduate') {
        const { name, regNo, email, contactNo, password, gpa } = req.body;

        try {
            const undergraduate = await Undergraduate.create({ name, regNo, email, contactNo, password, gpa });
            res.status(201).json({ undergraduate: undergraduate._id });
        } catch (err) {
            const errors = handleErrors(err);
            console.log({ errors });
            res.status(400).json({ errors });
        }
    }
    else if (userType === 'supervisor') {
        const { name, email, contactNo, company, jobRole, password } = req.body;

        try {
            const supervisor = await Supervisor.create({ name, email, contactNo, company, jobRole, password });
            res.status(201).json({ supervisor: supervisor._id });
        } catch (err) {
            const errors = handleErrors(err);
            console.log({ errors });
            res.status(400).json({ errors });
        }
    }
    else if (userType === 'alumni') {
        const { name, email, contactNo, regNo, graduatedYear, password } = req.body;

        try {
            const alumni = await Alumni.create({ name, email, contactNo, regNo, graduatedYear, password });
            res.status(201).json({ alumni: alumni._id });
        } catch (err) {
            const errors = handleErrors(err);
            console.log({ errors });
            res.status(400).json({ errors });
        }
    }
    else {
        console.log('invalid user type');
        res.status(400).send('invalid user type');
    }

}

//View all users by user type
module.exports.viewAllUsers_get = async (req, res) => {
    try {
        const userType = req.params.userType;
        let users = "";
        const User = User(userType);
        console.log(User);

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
        res.status(500).json({ message: "Server error" });
    }
}

// search users
module.exports.searchUsers_get = async (req, res) => {
    try {
        const userType = req.params.userType;
        const searchTerm = req.query.q;
        const searchBy = req.query.searchBy;
        let users;
        if (searchBy === "name") {
            switch (userType) {
                case "admin":
                    users = await Admin.find({ name: { $regex: searchTerm, $options: 'i' } });
                    break;
                case "undergraduate":
                    users = await Undergraduate.find({ name: { $regex: searchTerm, $options: 'i' } });
                    break;
                case "supervisor":
                    users = await Supervisor.find({ name: { $regex: searchTerm, $options: 'i' } });
                    break;
                case "alumni":
                    users = await Alumni.find({ name: { $regex: searchTerm, $options: 'i' } });
                    break;
                default:
                    users = { message: 'No any search results' };
            }
        }
        else if (searchBy === "regNo") {
            switch (userType) {
                case "admin":
                    users = await Admin.find({ regNo: { $regex: searchTerm, $options: 'i' } });
                    break;
                case "undergraduate":
                    users = await Undergraduate.find({ regNo: { $regex: searchTerm, $options: 'i' } });
                    break;
                case "supervisor":
                    users = await Supervisor.find({ regNo: { $regex: searchTerm, $options: 'i' } });
                    break;
                case "alumni":
                    users = await Alumni.find({ regNo: { $regex: searchTerm, $options: 'i' } });
                    break;
                default:
                    users = { message: 'No any search results' };
            }
        }

        res.status(200).json(users);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}