const Alumni = require("../models/Alumni");
const handleErrors = require("../utils/appErrors");
const catchAsync = require('../utils/catchAsync');

// Method = POST
// Endpoint = "/create-alumni"
// Function = create alumni-user
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