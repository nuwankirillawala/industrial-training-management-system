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


// Method: POST
// Endpoint: "/create"
// Description: create admin-user
// User: Admin
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
        console.log(err);
        const errors = handleErrors(err);
        console.log({ errors });
        res.status(500).json({
            status: "error",
            message: "This user allready existed",
            data: errors
        });
    }
});

// Method: GET
// Endpoint: "/profile"
// Description: view admin profile
// User: Admin (self)
module.exports.getAdminProfile = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await Admin.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ "error": "User not found!" })
        }
        res.status(200).json({ user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err })
    }
})

// Method: PATCH
// Endpoint: "/profile"
// Description: Update admin profile
// User: Admin (self)
module.exports.updateAdminProfile = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;
        const { role, name, email, contactNo, staffId } = req.body;

        const user = await Admin.findByIdAndUpdate(
            userId,
            {
                role,
                name,
                email,
                contactNo,
                staffId,
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

// Method: GET
// Endpoint: "/user/:userId"
// Description: view admin profile
// User: Admin
module.exports.getAdminUser = catchAsync(async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await Admin.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ "error": "User not found!" })
        }
        res.status(200).json({ user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err })
    }
})

// Method: PATCH
// Endpoint: "/user/:userId"
// Description: Update admin profile
// User: Admin
module.exports.updateAdminUser = catchAsync(async (req, res) => {
    try {
        const userId = req.params.userId;
        const { role, name, email, contactNo, staffId } = req.body;

        const user = await Admin.findByIdAndUpdate(
            userId,
            {
                role,
                name,
                email,
                contactNo,
                staffId,
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

// Method = PATCH
// Endpoint = "/profile/image"
// Description = Update admin profile image
// User: Admin (self)
module.exports.updateAdminProfileImage = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;

        const filePath = `files/images/${req.file.filename}`;
        fs.renameSync(req.file.path, filePath);

        if (!filePath) {
            console.log('image not uploaded');
        }

        const user = await Admin.findByIdAndUpdate(
            userId,
            {
                profileImage: filePath
            },
            { new: true }
        );

        if (!user) {
            return res.status(400).json({ error: "user not found" });
        }

        res.status(200).json(user.profileImage);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Method: GET
// Endpoint: "/users/:userType"
// Description: View all users by user type
// User: Admin
module.exports.viewAllUsers = catchAsync(async (req, res) => {
    try {
        const userType = req.params.userType;
        let users = [];

        if (userType === "admin") {
            users = await Admin.find().select('-password');
        }
        else if (userType === "undergraduate") {
            users = await Undergraduate.find().select('-password');
        }
        else if (userType === "supervisor") {
            users = await Supervisor.find().select('-password');
        }
        else if (userType === "alumni") {
            users = await Alumni.find().select('-password');
        }

        console.log(users);
        res.status(200).json({ users });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Method: GET
// Endpoint: "/users/search/:userType"
// Description: search user by name, regno, email
// User: Admin
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


// Method: DELETE
// Endpoint: "/delete/:userId"
// Description: Delete an Admin
// User: Admin
module.exports.deleteAdmin = catchAsync(async (req, res) => {
    try {
        const userId = req.params.userId;

        const deletedUser = await Admin.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(202).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: "server error!" });
    }
});