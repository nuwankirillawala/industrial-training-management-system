const Alumni = require("../models/Alumni");
const Company = require("../models/Company");
const handleErrors = require("../utils/appErrors");
const catchAsync = require('../utils/catchAsync');

// Method: POST
// Endpoint: "/create"
// Description: create alumni-user
// User: admin
module.exports.createAlumni = catchAsync(async (req, res) => {
    try {
        const { name, email, contactNo, regNo, graduatedYear, password } = req.body;
        const user = await Alumni.create({ name, email, contactNo, regNo, graduatedYear, password });

        if (!user) {
            return res.status(400).json({ message: "error! can't create the user!" });
        }

        res.status(201).json({
            user: user._id,
            type: user.role,
            message: "alumni created successfullly"
        });
    } catch (err) {
        const errors = handleErrors(err);
        console.log({ errors });
        res.status(500).json({ errors });
    }
});

// Method: GET
// Endpoint: "/dashboard"
// Description: get alumni dashboard
// User: alumni
module.exports.getAlumniDashboard = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await Alumni.findById(userId);
        const companyList = await Company.find();
        
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        res.status(200).json({user, companyList});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Method = GET
// Endpoint = "/profile"
// Description = get alumni profile
// User: alumni
module.exports.getAlumniProfile = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await Alumni.findById(userId);
        
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Method = PATCH
// Endpoint = "/profile"
// Description = Update alumni profile
// User: Alumni
module.exports.updateAlumniProfile = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, email, contactNo, regNo, graduatedYear } = req.body;

        const update = { $set: { name, email, contactNo, regNo, graduatedYear } };
        const options = { new: true };

        const user = await Alumni.findByIdAndUpdate(
            userId,
            update,
            options
        );
        
        if (!user) {
            return res.status(401).json({ error: "user not found" });
        }

        res.status(201).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Method = GET
// Endpoint = "/user/:userId"
// Description = get alumni
// User: Admin
module.exports.getAlumniUser = catchAsync(async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await Alumni.findById(userId);
        
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Method = PATCH
// Endpoint = "/user/:userId"
// Description = Update alumni
// User: Admin
module.exports.updateAlumniUser = catchAsync(async (req, res) => {
    try {
        const userId = req.params.userId;
        const { name, email, contactNo, regNo, graduatedYear } = req.body;

        const update = { $set: { name, email, contactNo, regNo, graduatedYear } };
        const options = { new: true };

        const user = await Alumni.findByIdAndUpdate(
            userId,
            update,
            options
        );
        
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        res.status(201).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Method = GET
// Endpoint = "/user/all"
// Description = get all alumni
// User: Admin
module.exports.getAllAlumniUsers = catchAsync(async (req, res) => {
    try {
        const alumniList = await Alumni.find();
        
        if (!alumniList) {
            return res.status(404).json({ error: "any user not found" });
        }

        res.status(200).json(alumniList);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});