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
            return res.status(400).json({ error: "update failed" });
        }

        res.status(200).json({
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