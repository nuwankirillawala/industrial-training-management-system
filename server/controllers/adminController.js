const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Undergraduate = require('../models/Undergraduate');
const Alumni = require('../models/Alumni');
const Supervisor = require('../models/Supervisor');
const Company = require('../models/Company');
const handleErrors = require('../utils/appErrors');
const { default: mongoose } = require('mongoose');

//create users - all types
module.exports.createUser = async (req, res) => {
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
        res.status(400).json({ error: 'invalid user type' });
    }

}

//View all users by user type
module.exports.viewAllUsers = async (req, res) => {
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
        res.status(500).json({ error: "Server error" });
    }
}

// search users
module.exports.searchUsers = async (req, res) => {
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

// create a company
module.exports.createCompany = async (req, res) => {
    try {
        const { name, email, contactNo, address, internSeats, description } = req.body;
        //const {criteria01} = req.body.rating;
        const company = await Company.create({ name, email, contactNo, address, internSeats, description });
        res.status(201).json({ company: company._id });
    } catch (err) {
        const errors = handleErrors(err);
        console.log(errors);
        res.status(400).json({ errors });
    }
}

// add a contact person for a company
module.exports.addContactPerson = async (req, res) => {
    try {
        const contactPersonData = req.body;
        // Convert the request parameter "companyID" to a MongoDB ObjectID
        const id = mongoose.Types.ObjectId(req.params.companyID);

        Company.findById(id, (err, company) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: 'An error occurred while finding the company' });
                return;
            }

            if (!company) {
                res.status(404).json({ error: 'The company was not found' });
                return;
            }

            company.contactPerson.push(contactPersonData);

            company.save((err) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ error: 'An error occurred while saving the updated company' });
                    return;
                }

                res.status(200).json({ message: 'The contact person was added successfully' });
            });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err });
    }
}