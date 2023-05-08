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

// ############################## Progress Report ##############################

// Method: POST
// Endpoint: "/add-progress-report/:internId"
// Description: add the progress report for industrial training
// User: supervisor
module.exports.addProgressReport = catchAsync(async (req, res) => {
    try {
        const userId = res.locals.user.id;
        const user = await Supervisor.findById(userId);
        if (!user) {
            return res.status(400).json({ error: "user not found" });
        }

        const internId = req.params.internId;
        const {establishment, startDate, endDate, comments, leaves, status} = req.body;
        // comments = {conduct, attendance, attitude}
        // leaves = {total, authorized, unauthorized}
        // status = 'saved' or 'submitted'

        const intern = await Undergraduate.findById(internId);
        if (!intern) {
            return res.status(400).json({ error: "intern not found" });
        }


        if(!intern.supervisor === user._id){
            return res.status(400).json({error: "this intern is not assigned to you"});
        }
        
        intern.progressReport.establishment = establishment;
        intern.progressReport.trainingPeriod.startDate = startDate;
        intern.progressReport.trainingPeriod.endDate = endDate;
        intern.progressReport.comments.conduct = comments.conduct;
        intern.progressReport.comments.attitude = comments.attitude;
        intern.progressReport.comments.attendance = comments.attendance;
        intern.progressReport.leaves.total = leaves.total;
        intern.progressReport.leaves.authorized = leaves.authorized;
        intern.progressReport.leaves.unauthorized = leaves.unauthorized;
        intern.progressReport.signatureOfSupervisor = intern.supervisor;
        intern.progressReport.reportStatus = status;

        await intern.save();


        res.status(200).json({ progressReport: intern.progressReport });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
