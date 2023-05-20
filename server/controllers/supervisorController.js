const Company = require("../models/Company");
const Supervisor = require("../models/Supervisor");
const Undergraduate = require("../models/Undergraduate");
const handleErrors = require("../utils/appErrors");
const catchAsync = require("../utils/catchAsync");

// Method = POST
// Endpoint = "/create-supervisor"
// Description = create supervisor-user
module.exports.createSupervisor = catchAsync(async (req, res) => {
    try {
        const { name, email, contactNo, company, jobRole, password } = req.body;
        const user = await Supervisor.create({ name, email, contactNo, company, jobRole, password });
        // company = should be company object id

        if(!user){
            return res.status(400).json({error: "supervisor user creation failed"});
        }

        const updatedCompany = await Company.findByIdAndUpdate(
            company,
            { $addToSet: { supervisors: user._id } },
            { new: true }
        );
        console.log(user);
        console.log(updatedCompany);

        if (!updatedCompany) {
            return res.status(404).json({ error: "update failed" });
        }

        res.status(201).json({
            user: user._id,
            type: user.role,
            updatedCompany,
            message: "supervisor created successfullly"
        });
    } catch (err) {
        const errors = handleErrors(err);
        console.log({ errors });
        res.status(500).json({ errors });
    }
});

// Method = PATCH
// Endpoint = "/update-supervisor"
// Description = Update supervisor profile
module.exports.updateSupervisor = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, email, contactNo, company, jobRole } = req.body;

        const update = { $set: { name, email, contactNo, company, jobRole } };
        const options = { new: true };

        const user = await Supervisor.findByIdAndUpdate(
            userId,
            update,
            options
        );
        
        if (!user) {
            return res.status(400).json({ error: "user not found" });
        }

        res.status(201).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Method: GET
// Endpoint: "/profile"
// Description: view supervisor profile
module.exports.getSupervisor = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await Supervisor.findById(userId);
        
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
// Endpoint: "/users"
// Description: view all supervisor
module.exports.getAllSupervisors = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await Supervisor.find();
        
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
// Endpoint: "/userId"
// Description: view a supervisor
module.exports.viewSupervisor = catchAsync(async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await Supervisor.findById(userId);
        
        if (!user) {
            return res.status(400).json({ error: "user not found" });
        }

        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});