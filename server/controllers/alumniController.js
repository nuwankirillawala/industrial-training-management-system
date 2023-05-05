const Alumni = require("../models/Alumni");
const handleErrors = require("../utils/appErrors");
const catchAsync = require('../utils/catchAsync');

// Method = POST
// Endpoint = "/create-alumni"
// Description = create alumni-user
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


// Method = PATCH
// Endpoint = "/update-alumni-profile"
// Description = Update alumni profile
module.exports.updateAlumniProfile = catchAsync(async (req, res) => {
    try {
        const userId = req.body.id;
        const { name, email, contactNo, regNo, graduatedYear } = req.body;

        const filter = { _id: userId };
        const update = { $set: { name, email, contactNo, regNo, graduatedYear } };
        const options = { new: true };

        // findbyIdAndUpdate mongoose⚡

        await Admin.updateOne(filter, update, options)
            .then(async () => {
                const user = await Alumni.findOne(filter);
                if (!user) {
                    return res.status(400).json({ message: "user not exists" });
                }
                res.status(200).json(user);
            })
            .catch((error) => {
                console.log(error.message);
                res.status(400).json(error);
            });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});