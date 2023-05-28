const { default: mongoose } = require("mongoose");
const Company = require("../models/Company");
const Undergraduate = require("../models/Undergraduate");
const handleErrors = require("../utils/appErrors");
const catchAsync = require("../utils/catchAsync");
const quickSortByWGPA = require('../utils/quickSortByWGPA');
const Admin = require("../models/Admin");
const Alumni = require("../models/Alumni");


// Method: POST
// Endpoint: "/create"
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

// Method: PATCH
// Endpoint: "/:companyId/profile"
// Description: update a company
// User: Admin
module.exports.updateCompanyProfile = catchAsync(async (req, res) => {
    try {
        const companyId = req.params.companyId;
        const { name, email, contactNo, address, internSeats, description, connectedForIntern } = req.body;

        const company = await Company.findByIdAndUpdate(
            companyId,
            { name, email, contactNo, address, internSeats, description, connectedForIntern }
        );

        if (!company) {
            return res.status(404).json({ error: "company not found" });
        }

        res.status(201).json({
            message: "company updated successfully",
            company
        });
    } catch (err) {
        const errors = handleErrors(err);
        console.log(errors);
        res.status(400).json({ errors });
    }
});

// Method: GET
// Endpoint: "/profile/:companyId"
// Description: get a company
// User: Admin
module.exports.getCompanyProfile = catchAsync(async (req, res) => {
    try {
        const companyId = req.params.companyId;
        console.log(companyId);

        const company = await Company.findById(companyId)
            .populate({
                path: 'internApplications.applicationList.candidate',
                model: Undergraduate
            });

        if (!company) {
            return res.status(404).json({ error: "company not found" });
        }
        console.log(company);

        res.status(200).json({
            company
        });
    } catch (err) {
        // const errors = handleErrors(err);
        console.log(err);
        res.status(400).json(err);
    }
});

// Method: GET
// Endpoint: "/all"
// Description: get all company
// User: Admin
module.exports.getAllCompanies = catchAsync(async (req, res) => {
    try {
        const companyList = await Company.find();

        if (!companyList) {
            return res.status(404).json({ error: "no any company found" });
        }

        res.status(200).json({
            companyList
        });
    } catch (err) {
        // const errors = handleErrors(err);
        console.log(errors);
        res.status(400).json(err);
    }
});


// Method: POST
// Endpoint: "/:companyID/contact-person"
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
// Endpoint: "/:companyID/rating"
// Description: edit company ratings
// User: Admin, Alumni
module.exports.editCompanyRating = catchAsync(async (req, res) => {
    try {
        const companyId = req.params.companyId;
        const {
            culture,
            work_life_balance,
            opportunities_to_growth,
            salary_and_benefits,
            location,
            projects,
            mentorship,
            reputation,
            industry,
            technology,
            team_size,
            values,
            mission,
            support,
            experience,
            total } = req.body;

        const ratings = {
            culture,
            work_life_balance,
            opportunities_to_growth,
            salary_and_benefits,
            location,
            projects,
            mentorship,
            reputation,
            industry,
            technology,
            team_size,
            values,
            mission,
            support,
            experience,
            total
        };

        console.log(ratings);

        const company = await Company.findByIdAndUpdate(companyId, { ratings }, { new: true });

        if (!company) {
            return res.status(404).json({ error: "company not found" });
        }

        console.log(company);

        res.status(201).json({
            mesage: "rating updated successfully",
            ratings: company.ratings
        });
    } catch (err) {
        console.log(err);
    }
});


// Method: PATCH
// Endpoint: "/:companyID/rating/admin"
// Description: add company ratings by admin
// User: Admin
module.exports.editCompanyRatingByAdmin = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;
        const companyId = req.params.companyId;
        const {
            culture,
            work_life_balance,
            opportunities_to_growth,
            salary_and_benefits,
            location,
            projects,
            mentorship,
            reputation,
            industry,
            technology,
            team_size,
            values,
            mission,
            support,
            experience,
            total } = req.body;

        const ratings = {
            culture,
            work_life_balance,
            opportunities_to_growth,
            salary_and_benefits,
            location,
            projects,
            mentorship,
            reputation,
            industry,
            technology,
            team_size,
            values,
            mission,
            support,
            experience,
            total
        };

        console.log(ratings);

        const user = await Admin.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ error: "company not found" });
        }

        company.adminRatings.push({ user: user._id, ratings });
        company.calculateAverageRatings();

        company.save();
        console.log(company);

        res.status(201).json({
            mesage: "admin rating updated successfully",
            adminRatings: company.adminRatings,
            ratings: company.ratings,
        });
    } catch (err) {
        console.log(err);
    }
});


// Method: PATCH
// Endpoint: "/:companyID/rating/alumni"
// Description: add company ratings by alumni
// User: Alumni
module.exports.editCompanyRatingByAlumni = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;
        const companyId = req.params.companyId;
        const {
            culture,
            work_life_balance,
            opportunities_to_growth,
            salary_and_benefits,
            location,
            projects,
            mentorship,
            reputation,
            industry,
            technology,
            team_size,
            values,
            mission,
            support,
            experience,
            total } = req.body;

        const ratings = {
            culture,
            work_life_balance,
            opportunities_to_growth,
            salary_and_benefits,
            location,
            projects,
            mentorship,
            reputation,
            industry,
            technology,
            team_size,
            values,
            mission,
            support,
            experience,
            total
        };

        console.log(ratings);

        const user = await Alumni.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ error: "company not found" });
        }

        company.alumniRatings.push({ user: user._id, ratings });
        company.calculateAverageRatings();

        company.save();
        console.log(company);

        res.status(201).json({
            mesage: "almni rating updated successfully",
            alumniRatings: company.alumniRatings,
            ratings: company.ratings,
        });
    } catch (err) {
        console.log(err);
    }
});




// Method: GET
// Endpoint: "/intern-process/company-list"
// Description: View companies that select for intern application process
// User: Admin, Undergraduate
module.exports.internProcessCompanyList = catchAsync(async (req, res) => {
    try {
        const companyList = await Company.find({ connectedForIntern: true });

        if (companyList.length === 0) {
            return res.status(404).json({ message: "No any company for intern process" });
        }

        // res.status(200).json({companyList});
        res.status(200).json(companyList);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Method: PATCH
// Endpoint: "/intern-process/recommendations"
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

        const recommendations = await Company.find().select('internApplications.recommendations, name').populate({
            path: 'internApplications.recommendations.candidate',
            model: Undergraduate,
        }).session(session);

        await session.commitTransaction();

        res.status(201).json({
            message: "recommadation generation successfully completed",
            recommendations,
        });
    } catch (err) {
        session.abortTransaction();
        console.log(err);
        res.status(500).json(err);
    } finally {
        session.endSession();
    }
})


// Method: GET
// Endpoint: "/intern-process/company/:companyId"
// Description: get companies that offer internships through university
// User: Admin, Undergraduate
module.exports.internProcessCompany = catchAsync(async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const companyId = req.params.companyId;
        const company = await Company.findById(companyId)
            .maxTimeMS(15000)
            .populate({
                path: 'internApplications.applicationList.candidate',
                model: Undergraduate,
                session
            })
            .session(session);
        const users = await Undergraduate.find().session(session);
        if (!company) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Can't find the company" });
        }
        users.forEach(async (user) => {
            const companySelection = user.companySelection;
            const choices = Object.keys(companySelection);
            let isCompanySelected = false; // Track if the company is already selected

            choices.forEach((choice) => {
                const choiceNumber = parseInt(choice.replace('choice', ''));
                const companyInChoice = companySelection[choice].company && companySelection[choice].company.toString();

                // Check if the company exists in the undergraduate's choices
                const companyExists = companyInChoice === companyId;

                if (companyExists && !isCompanySelected) {
                    // Update isListed attribute to indicate undergraduate's choice
                    user.isListed = {
                        choice: {
                            isSelected: true,
                            choiceNumber: choiceNumber
                        }
                    };
                    isCompanySelected = true; // Set the flag to true after selecting a company
                } else {
                    user.isListed = {
                        choice: {
                            isSelected: false,
                            choiceNumber: null
                        }
                    };
                }

                // console.log(user.isListed.choice.choiceNumber);
                // user.markModified('isListed');
            });
            console.log(user.name);
            console.log(user.isListed);
            console.log(user.internStatus);
            // await user.save({ session });
            // user = '';

            // user = await Undergraduate.findOneAndUpdate(user._id, { isListed: user.isListed }, { session, runValidators: true });
            // if (!user) {
            //     console.log("error");
            //     await session.abortTransaction();
            //     return;

            // }

        });

        // await Promise.all(users.map((user) => user.save({ session })));

        await session.commitTransaction();

        res.status(200).json({ company, users });
    } catch (err) {
        await session.abortTransaction();
        console.log(err);
        res.status(500).json(err);
    } finally {
        session.endSession();
    }
});



// Method: POST
// Endpoint: "/intern-process/company"
// Description: add candidates to the company list
// User: Admin
module.exports.updateCompanyInternApplicationList = catchAsync(async (req, res) => {
    try {
        const { companyId, candidateList } = req.body;
        console.log("candidateList", candidateList);
        console.log("companyId", companyId);

        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({ error: 'Company not found!' });
        }

        console.log("company", company);

        //   const applicationList = company.internApplications.applicationList;
        const applicationList = [];


        //   const existingCandidates = company.internApplications.applicationList.map(
        //     (item) => item.candidate.toString()
        //   );

        candidateList.forEach(async (candidate) => {
            console.log(candidate);
            // const user = await Undergraduate.findById(candidate._id);
            // const candidateExists = existingCandidates.includes(candidateId);

            // if (!candidateExists && applicationList.length < company.internApplications.applicationListSize) {
            if (applicationList.length < company.internApplications.applicationListSize) {

                applicationList.push({ candidate: candidate._id });
            }
        });

        company.internApplications.applicationList = applicationList;
        company.internApplications.applicationStatus = 'saved';

        await company.save();

        res.status(201).json({ company });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Method: PATCH
// Endpoint: "/intern-process/student"
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