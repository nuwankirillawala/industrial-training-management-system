const Supervisor = require("../models/Supervisor");
const handleErrors = require("../utils/appErrors");
const catchAsync = require("../utils/catchAsync");

// Method = POST
// Endpoint = "/create-supervisor"
// Function = create supervisor-user
module.exports.createSupervisor = catchAsync(async (req, res) => {
    try {
        const { name, email, contactNo, company, jobRole, password } = req.body;
        const user = await Supervisor.create({ name, email, contactNo, company, jobRole, password });

        if(!user){
            return res.status(400).json({message: "error! can't create the user!"});
        }

        res.status(201).json({
            user: user._id,
            type: user.role,
            message: "supervisor created successfullly"
        });
    } catch (err) {
        const errors = handleErrors(err);
        console.log({ errors });
        res.status(500).json({ errors });
    }
});