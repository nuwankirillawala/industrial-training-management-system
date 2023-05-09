const { default: mongoose } = require("mongoose");
const Company = require("../models/Company");
const Undergraduate = require("../models/Undergraduate");
const handleErrors = require("../utils/appErrors");
const catchAsync = require("../utils/catchAsync");
const quickSortByWGPA = require('../utils/quickSortByWGPA');


// Method: POST
// Endpoint: "/create-company"
// Description: create a company
// User: Admin
module.exports.createCompany = catchAsync(async (req, res) => {
    try {
        const { name, email, contactNo, address, internSeats, description, connectedForIntern } = req.body;
        const company = await Company.create({ name, email, contactNo, address, internSeats, description, connectedForIntern });
        res.status(201).json({ company: company._id });
    } catch (err) {
        const errors = handleErrors(err);
        console.log(errors);
        res.status(400).json({ errors });
    }
});

// Method: POST
// Endpoint: "/:companyID/add-contact-person"
// Description: add a contact person for a company
// User: Admin
module.exports.addContactPerson = catchAsync(async (req, res) => {
    try {
        const contactPersonData = req.body;
        // Convert the request parameter "companyID" to a MongoDB ObjectID
        const id = mongoose.Types.ObjectId(req.params.companyID);

        Company.findByIdAndUpdate(
            id,
            { $push: { contactPerson: contactPersonData } },
            { new: true },
            (err, updatedCompany) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: 'An error occurred while updating the company' });
                }

                if (!updatedCompany) {
                    return res.status(404).json({ error: 'The company was not found' });
                }

                res.status(200).json({ message: 'The contact person was added successfully' });
            }
        );

    } catch (err) {
        console.log(err);
        res.status(500).json({ err });
    }
});

// Method: PATCH
// Endpoint: "/:companyID/edit-rating"
// Description: edit company ratings
// User: Admin, Alumni
module.exports.editCompanyRating = catchAsync(async (req, res) => {
    try {
        const companyID = req.params.companyID;
        console.log(companyID);
        const c = Company.find();
        console.log(c)
        // Company.findById(companyID, (err, foundCompany) => {
        //     if(err){
        //         console.log(err);
        //     } else {
        //         console.log(foundCompany);
        //     } 
        // }) 
    } catch (err) {
        console.log(err);
    }
});

// Method: GET
// Endpoint: "/intern-process-company-list"
// Description: View companies that select for intern application process
// User: Admin, Undergraduate
module.exports.internProcessCompanyList = catchAsync(async (req, res) => {
    try {
        const companyList = await Company.find({ connectedForIntern: true });

        if (companyList.length === 0) {
            return res.status(404).json({ message: "No any company for intern process" });
        }

        // res.status(200).json({companyList});
        res.status(200).json({
            status: "success",
            length: companyList.length,
            data: companyList
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Method: PATCH
// Endpoint: "/intern-process"
// Description: Create a intern lists
// User: Admin
module.exports.internProcess = catchAsync(async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const candidates = await Undergraduate.find().session(session);
        const weightedGPAList = await quickSortByWGPA(candidates);

        for (let i = 0; i < weightedGPAList.length; i++) {

            const candidate = weightedGPAList[i];

            // check company slection is done by candidate // may be unnessasry
            if (!candidate.companySelection.choice01) {
                console.log('user not enter company selection');
                continue;
            }

            //get company selections from candidate
            const company01 = await Company.findOne({ _id: candidate.companySelection.choice01.company, connectedForIntern: true }).session(session);
            const company02 = await Company.findOne({ _id: candidate.companySelection.choice02.company, connectedForIntern: true }).session(session);
            const company03 = await Company.findOne({ _id: candidate.companySelection.choice03.company, connectedForIntern: true }).session(session);
            const company04 = await Company.findOne({ _id: candidate.companySelection.choice04.company, connectedForIntern: true }).session(session);
            const company05 = await Company.findOne({ _id: candidate.companySelection.choice05.company, connectedForIntern: true }).session(session);


            console.log(company01, company02, company03);

            // check if company selections are available or not
            if (!company01 || !company02 || !company03 || !company05 || !company05) {
                console.log("Some company selections are not connected for internships");
                continue;
            }

            let companyCount = 0;

            // check candidate for first selection
            if (companyCount < 3 && company01 && company01.internApplications.recommendations.length < company01.internApplications.applicationListSize) {
                company01.internApplications.recommendations.push({ candidate: candidate._id });
                company01.save((err, doc) => {
                    if (err) {
                        return console.log(err);
                    }
                    console.log(doc);
                }).session(session);
                companyCount++;
            }

            // check candidate for second selection
            if (companyCount < 3 && company02 && company02.internApplications.recommendations.length < company02.internApplications.applicationListSize) {
                company02.internApplications.recommendations.push({ candidate: candidate._id });
                company02.save((err, doc) => {
                    if (err) {
                        return console.log(err);
                    }
                    console.log(doc);
                }).session(session);
                companyCount++;
            }

            // check candidate for third selection
            if (companyCount < 3 && company03 && company03.internApplications.recommendations.length < company03.internApplications.applicationListSize) {
                company03.internApplications.recommendations.push({ candidate: candidate._id });
                company03.save((err, doc) => {
                    if (err) {
                        return console.log(err);
                    }
                    console.log(doc);
                }).session(session);
                companyCount++;
            }

            if (companyCount < 3 && company04 && company04.internApplications.recommendations.length < company04.internApplications.applicationListSize) {
                company04.internApplications.recommendations.push({ candidate: candidate._id });
                company04.save((err, doc) => {
                    if (err) {
                        return console.log(err);
                    }
                    console.log(doc);
                }).session(session);
                companyCount++;
            }

            if (companyCount < 3 && company05 && company05.internApplications.recommendations.length < company05.internApplications.applicationListSize) {
                company05.internApplications.recommendations.push({ candidate: candidate._id });
                company05.save((err, doc) => {
                    if (err) {
                        return console.log(err);
                    }
                    console.log(doc);
                }).session(session);
                companyCount++;
            }
        }

        const recommendations = await Company.find().select('internApplications.recommendations').session(session);

        await session.commitTransaction();

        res.status(201).json({
            message: "recommadation generation successfully completed",
            recommendations,
        });
    } catch (err) {
        session.abortTransaction();
        console.log(err);
        res.status(500).json(err);
    } finally{
        session.endSession();
    }
})


// Method: GET
// Endpoint: "/intern-process-company"
// Description: get companies that offer internships through university
// User: Admin, Undergraduate
module.exports.internProcessCompany = catchAsync(async (req, res) => {
    try {
        const companyId = req.body.companyId;
        const company = await Company.findById(companyId);
        const users = await Undergraduate.find().select('name regNo gpa weightedGPA internStatus');

        if (!company) {
            return res.status(400).json({ message: "Can't find the company" });
        }
        console.log(company, users);
        res.status(200).json({ company, users });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Method: POST
// Endpoint: "/intern-process-company"
// Description: add candidates to the company list
// User: Admin
module.exports.updateCompanyInternApplicationList = catchAsync(async (req, res) => {
    try {
        const { companyId, candidateList } = req.body;

        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({ error: 'Company not found!' });
        }

        candidateList.forEach((candidate) => {
            while (company.internApplications.applicationListSize >= company.internApplications.applicationList.length) {
                company.internApplications.applicationList.push({ candidate: candidate.id })
            }
        })

        company.internApplications.applicationStatus = 'saved';

        await company.save();

        res.status(201).json({ company });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Method: PATCH
// Endpoint: "/intern-process-student"
// Description: add candidate to the company list
// User: Admin
module.exports.addCandidateToApplicationList = catchAsync(async (req, res) => {
    try {
        const { companyId, candidateId } = req.body;

        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ error: 'Company not found!' });
        }

        const candidate = await Undergraduate.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ error: "candidate not found" });
        }

        if (company.internApplications.applicationList.length >= company.internApplications.applicationListSize) {
            return res.status(400).json({ error: "company application list is full. " });
        }

        company.internApplications.applicationList.push(candidate._id);
        company.internApplications.applicationStatus = 'saved';

        await company.save();

        res.status(201).json({ company });
    } catch (err) {
        res.status(500).json(err);
    }
});