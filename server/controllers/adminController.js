const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Undergraduate = require('../models/Undergraduate');
const Alumni = require('../models/Alumni');
const Supervisor = require('../models/Supervisor');
const Company = require('../models/Company');
const Result = require('../models/Result');
const handleErrors = require('../utils/appErrors');
const catchAsync = require('../utils/catchAsync');
const { default: mongoose } = require('mongoose');
const xlsx = require('xlsx');
const path = require('path');
const multer = require('multer');
const searchUsers = require('../utils/searchUsers');
const setCreditValue = require('../utils/setCreditValue');
const gradeValue = require('../utils/gradeValue');
const fs = require('fs');


// Method = POST
// Endpoint = "/create-admin"
// Description = create admin-user
module.exports.createAdmin = catchAsync(async (req, res) => {
    try {
        const { role, name, email, contactNo, staffId, password } = req.body;
        const user = await Admin.create({ role, name, email, contactNo, staffId, password });

        if (!user) {
            return res.status(400).json({
                status: "error",
                message: "error! can't create the user!"
            });
        }

        res.status(201).json({
            user: user._id,
            type: user.role,
            message: `${user.role} created successfullly`
        });
    } catch (err) {
        const errors = handleErrors(err);
        console.log({ errors });
        res.status(500).json({
            starus: "error",
            message: "This user allready created",
            data: errors
        });
    }
});

// Method = GET
// Endpoint = "/view-all-users/:userType"
// Description = View all users by user type
module.exports.viewAllUsers = catchAsync(async (req, res) => {
    try {
        const userType = req.params.userType;
        let users = [];

        if (userType === "admin") {
            users = await Admin.find();
        }
        else if (userType === "undergraduate") {
            users = await Undergraduate.find();
        }
        else if (userType === "supervisor") {
            users = await Supervisor.find();
        }
        else if (userType === "alumni") {
            users = await Alumni.find();
        }

        console.log(users);
        res.status(200).json({ users });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Method = GET
// Endpoint = "/search-users/:userType"
// Description = search user by name, regno, email
module.exports.searchUsers = catchAsync(async (req, res) => {
    try {
        const userType = req.params.userType;
        const searchTerm = req.query.q;
        const searchBy = req.query.searchBy;

        let users = await searchUsers(searchBy, userType, searchTerm);

        res.status(200).json(users);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Method = GET
// Endpoint = "/admin profile"
// Description = view admin profile
module.exports.adminProfile = catchAsync(async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await Admin.findById(userId);

        if (!user) {
            return res.status(404).json({ "error": "User not found!" })
        }
        res.status(200).json({ user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err })
    }
})

// Method = PATCH
// Endpoint = "/update-admin-profile"
// Description = Update admin profile
module.exports.updateAdminProfile = catchAsync(async (req, res) => {
    try {
        const userId = res.locals.user.id;
        const { role, name, email, contactNo, staffId } = req.body;

        const filePath = `files/images/${req.file.filename}`;
        fs.renameSync(req.file.path, filePath);

        if (!filePath) {
            console.log('image not uploaded');
        }

        const user = await Admin.findByIdAndUpdate(
            userId,
            {
                role,
                name,
                email,
                contactNo,
                staffId,
                profileImage: filePath
            },
            { new: true }
        );
        
        if (!user) {
            return res.status(400).json({ error: "user not found" });
        }

        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});