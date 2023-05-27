const Undergraduate = require('../models/Undergraduate');
const Company = require('../models/Company');
const Supervisor = require('../models/Supervisor');
const handleErrors = require('../utils/appErrors');
const { default: mongoose } = require('mongoose');
const catchAsync = require('../utils/catchAsync');
const { startOfWeek, endOfWeek, addWeeks, format, addDays, startOfMonth, endOfMonth, getWeeksInMonth, addMonths } = require('date-fns');
const fs = require('fs');
const path = require('path');

// Method: POST
// Endpoint: "/create"
// Description: create undergraduate user
// User: admin
module.exports.createUndergraduate = catchAsync(async (req, res) => {

    try {
        const { name, regNo, email, contactNo, password, gpa } = req.body;
        console.log(name);

        const user = await Undergraduate.create({ name, regNo, email, contactNo, password, gpa });

        if (!user) {
            return res.status(400).json({ error: "error! can't create the user!" });
        }
        res.status(201).json({
            user: user._id,
            type: user.role,
            message: "undergraduate created successfullly"
        });
    } catch (err) {
        const errors = handleErrors(err);
        console.log({ errors });
        res.status(500).json({ errors });
    }
});

// Method: GET
// Endpoint: "/user/all"
// Description: View all undergraduates
// User: admin
module.exports.viewAll = catchAsync(async (req, res) => {
    try {
        const users = await Undergraduate.find();

        res.status(200).json({ users });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Method: GET
// Endpoint: "/users/:undergraduateId"
// Description: get Undegraduate Profile
// User: admin
module.exports.getUndergraduate = catchAsync(async (req, res) => {
    try {
        const userId = req.params.undergraduateId;
        console.log(userId);
        const user = await Undergraduate.findById(userId).select('-password');

        if (!user) {
            res.status(404).json({ error: "user not found!" })
        }
        else {
            res.status(200).json({ user });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ err })
    }
});

// Method: PATCH
// Endpoint: "/user/:undergraduateId"
// Description: Update undergraduate profile
// User: Admin
module.exports.updateUndergraduateUser = catchAsync(async (req, res) => {
    try {
        const userId = req.params.undergraduateId;
        const { email, contactNo, linkdinURL, githubURL, internStatus } = req.body;

        const user = await Undergraduate.findByIdAndUpdate(
            userId,
            {
                email,
                contactNo,
                linkdinURL,
                githubURL,
                internStatus,
            },
            { new: true }
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
// Description: View Undegraduate Profile
// User: undergraduate
module.exports.viewProfile = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;
        console.log(userId);
        const user = await Undergraduate.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ error: "user not found!" })
        }

        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err })
    }
});

// Method: PATCH
// Endpoint: "/profile"
// Description: Update undergraduate profile
// User: undergraduate
module.exports.updateProfile = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;
        const { email, contactNo, linkdinURL, githubURL, internStatus } = req.body;

        const user = await Undergraduate.findByIdAndUpdate(
            userId,
            {
                email,
                contactNo,
                linkdinURL,
                githubURL,
                internStatus,
            },
            { new: true }
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


// Method: PATCH
// Endpoint: "/profile/image"
// Description: Update undergraduate profile
// User: undergraduate
module.exports.updateProfileImage = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;

        const filePath = `files/images/${req.file.filename}`;
        fs.renameSync(req.file.path, filePath);

        if (!filePath) {
            console.log('image not uploaded');
        }

        const user = await Undergraduate.findByIdAndUpdate(
            userId,
            {
                profileImage: filePath
            },
            // { new: true }
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
// Endpoint: "/dashboard"
// Description: Undergraduate Dashboard
// User: undergraduate
module.exports.undergraduateDashboard = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await Undergraduate.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ error: "user not found!" });
        }

        const companies = await Company.find();

        res.status(200).json({ user, companies });
    } catch (err) {
        res.status(500).json({ error: "server error!" });
    }
});

// Method: DELETE
// Endpoint: "/delete"
// Description: Delete an undergraduate
// User: Admin
module.exports.deleteUndergraduate = catchAsync(async (req, res) => {
    try {
        const userId = req.params.userId;

        const deletedUser = await Undergraduate.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(202).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: "server error!" });
    }
});

// Method: POST
// Endpoint: "/note"
// Description: Add a note
// User: undergraduate
module.exports.addNote = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;
        const { title, content } = req.body;

        if (!content) {
            return res.status(400).json({ error: "Please add some content" });
        }

        let newTitle = title;

        if (!newTitle) {
            newTitle = content.substring(0, 15);
        }

        const newNote = { title: newTitle, content };

        const user = await Undergraduate.findByIdAndUpdate(userId, { $push: { notes: newNote } }, { new: true });
        if (!user) {
            return res.status(400).json({ error: "user not found!" });
        }

        res.status(201).json({ notes: user.notes });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Method = PATCH
// Endpoint = "/note"
// Description = Edit a note
// User: undergraduate
module.exports.editNote = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;
        const { noteId, newTitle, newContent } = req.body;

        const updatedUser = await Undergraduate.findOneAndUpdate(
            { _id: userId, "notes._id": noteId },
            {
                $set:
                {
                    "notes.$.title": newTitle,
                    "notes.$.content": newContent
                }
            }, { new: true });

        if (!updatedUser) {
            return res.status(400).json({ error: "update faiiled" });
        }

        res.status(201).json(updatedUser.notes);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Method: GET
// Endpoint: "/note/all"
// Description: get all notes
// User: undergraduate
module.exports.getAllNotes = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await Undergraduate.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        const notes = user.notes;
        if (!notes) {
            return res.status(400).json({ error: "notes not found" });
        }

        res.status(200).json(notes);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});

// Method: GET
// Endpoint: "/note/:noteId"
// Description: get a note
// User: undergraduate
module.exports.getNote = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;
        const noteId = req.params.noteId;

        const user = await Undergraduate.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        const note = user.notes.id(noteId);
        if (!note) {
            return res.status(404).json({ error: "note not found" });
        }

        res.status(200).json(note);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});

// Method: GET
// Endpoint: "/intern/list"
// Description: View all interns
// User: admin
module.exports.viewInternList = catchAsync(async (req, res) => {
    try {
        const users = await Undergraduate.find().select('name regNo gpa weightedGPA internStatus');

        res.status(200).json({ users });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Method: GET
// Endpoint: "/intern/company-selection"
// Description: get company selections for internship
// User: undergraduate
module.exports.getCompanySelection = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;
        const companySelection = await Undergraduate.findById(userId).select('companySelection');

        if (!companySelection) {
            return res.status(400).json({ error: "user company selection not found" });
        }

        res.status(200).json({ companySelection });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Method: PATCH
// Endpoint: "/intern/company-selection"
// Description: Select companies for internship
// User: undergraduate
// module.exports.updateCompanySelection = catchAsync(async (req, res) => {
//     const session = await mongoose.startSession();
//     session.startTransaction();
//     try {
//         const userId = req.user.id;
//         const { choice01, choice02, choice03, choice04, choice05 } = req.body;

//         const toValidObjectId = (id) => {
//             if (mongoose.Types.ObjectId.isValid(id)) {
//                 return mongoose.Types.ObjectId(id);
//             }
//             return null;
//         };

//         const foundCompany01 = choice01 && choice01.company ? (toValidObjectId(choice01.company) ? await Company.findById(choice01.company).session(session) : null) : null;
//         const foundCompany02 = choice02 && choice02.company ? (toValidObjectId(choice02.company) ? await Company.findById(choice02.company).session(session) : null) : null;
//         const foundCompany03 = choice03 && choice03.company ? (toValidObjectId(choice03.company) ? await Company.findById(choice03.company).session(session) : null) : null;
//         const foundCompany04 = choice04 && choice04.company ? (toValidObjectId(choice04.company) ? await Company.findById(choice04.company).session(session) : null) : null;
//         const foundCompany05 = choice05 && choice05.company ? (toValidObjectId(choice05.company) ? await Company.findById(choice05.company).session(session) : null) : null;

//         const foundCompanies = [foundCompany01, foundCompany02, foundCompany03, foundCompany04, foundCompany05];

//         // Check if any non-empty company was not found
//         if (
//             (!foundCompany01 && choice01 && choice01.company) ||
//             (!foundCompany02 && choice02 && choice02.company) ||
//             (!foundCompany03 && choice03 && choice03.company) ||
//             (!foundCompany04 && choice04 && choice04.company) ||
//             (!foundCompany05 && choice05 && choice05.company)
//           ) {
//             await session.abortTransaction();
//             return res.status(404).json({ error: 'Company not found' });
//           }

//         const nonEmptyChoices = foundCompanies.filter((company) => company !== null);
//         const nonEmptyCompanyIds = nonEmptyChoices.map((company) => company._id.toString());

//         // Check if non-empty company choices are unique
//         if (new Set(nonEmptyCompanyIds).size !== nonEmptyCompanyIds.length) {
//             await session.abortTransaction();
//             return res.status(400).json({ error: 'Cannot apply the same company twice' });
//         }

//         const updatedUser = await Undergraduate.findByIdAndUpdate(
//             userId,
//             {
//                 $set: {
//                     "companySelection.choice01.company": choice01.company,
//                     "companySelection.choice01.jobRole": choice01.jobRole,
//                     "companySelection.choice02.company": choice02.company,
//                     "companySelection.choice02.jobRole": choice02.jobRole,
//                     "companySelection.choice03.company": choice03.company,
//                     "companySelection.choice03.jobRole": choice03.jobRole,
//                     "companySelection.choice04.company": choice04.company,
//                     "companySelection.choice04.jobRole": choice04.jobRole,
//                     "companySelection.choice05.company": choice05.company,
//                     "companySelection.choice05.jobRole": choice05.jobRole,
//                 },
//             },
//             { new: true }
//         ).session(session);

//         if (!updatedUser) {
//             await session.abortTransaction();
//             return res.status(400).json({ error: "update failed" });
//         }

//         await session.commitTransaction();

//         res.status(201).json(updatedUser);
//     } catch (err) {
//         await session.abortTransaction();
//         console.log(err);
//         res.status(500).json(err);
//     } finally {
//         session.endSession();
//     }
// });
module.exports.updateCompanySelection = catchAsync(async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const userId = req.user.id;
        const { choice01, choice02, choice03, choice04, choice05 } = req.body;

        const toValidObjectId = (id) => {
            if (mongoose.Types.ObjectId.isValid(id)) {
                return mongoose.Types.ObjectId(id);
            }
            return null;
        };

        const foundCompany01 = choice01 && choice01.company ? (toValidObjectId(choice01.company) ? await Company.findById(choice01.company).session(session) : null) : null;
        const foundCompany02 = choice02 && choice02.company ? (toValidObjectId(choice02.company) ? await Company.findById(choice02.company).session(session) : null) : null;
        const foundCompany03 = choice03 && choice03.company ? (toValidObjectId(choice03.company) ? await Company.findById(choice03.company).session(session) : null) : null;
        const foundCompany04 = choice04 && choice04.company ? (toValidObjectId(choice04.company) ? await Company.findById(choice04.company).session(session) : null) : null;
        const foundCompany05 = choice05 && choice05.company ? (toValidObjectId(choice05.company) ? await Company.findById(choice05.company).session(session) : null) : null;

        const foundCompanies = [foundCompany01, foundCompany02, foundCompany03, foundCompany04, foundCompany05];

        // Check if any non-empty company was not found
        if (
            (!foundCompany01 && choice01 && choice01.company) ||
            (!foundCompany02 && choice02 && choice02.company) ||
            (!foundCompany03 && choice03 && choice03.company) ||
            (!foundCompany04 && choice04 && choice04.company) ||
            (!foundCompany05 && choice05 && choice05.company)
        ) {
            await session.abortTransaction();
            return res.status(404).json({ error: 'Company not found' });
        }

        const nonEmptyChoices = foundCompanies.filter((company) => company !== null);
        const nonEmptyCompanyIds = nonEmptyChoices.map((company) => company._id.toString());

        // Check if non-empty company choices are unique
        if (new Set(nonEmptyCompanyIds).size !== nonEmptyCompanyIds.length) {
            await session.abortTransaction();
            return res.status(400).json({ error: 'Cannot apply the same company twice' });
        }

        const getUpdateObject = (choice, index) => {
            const updateObj = {};
            if (choice && choice.company) {
                updateObj[`companySelection.choice${index + 1}.company`] = choice.company;
                updateObj[`companySelection.choice${index + 1}.jobRole`] = choice.jobRole;
            }
            return updateObj;
        };

        const updateObj = {
            $set: {
                ...getUpdateObject(choice01, 0),
                ...getUpdateObject(choice02, 1),
                ...getUpdateObject(choice03, 2),
                ...getUpdateObject(choice04, 3),
                ...getUpdateObject(choice05, 4),
            },
        };

        const updatedUser = await Undergraduate.findByIdAndUpdate(userId, updateObj, { new: true }).session(session);

        if (!updatedUser) {
            await session.abortTransaction();
            return res.status(400).json({ error: 'Update failed' });
        }

        await session.commitTransaction();

        res.status(201).json(updatedUser);
    } catch (err) {
        await session.abortTransaction();
        console.log(err);
        res.status(500).json(err);
    } finally {
        session.endSession();
    }
});

// Method: PATCH
// Endpoint: "/intern/set-weigted-gpa"
// Description: Set wiighted gpa for undergraduate
// User: admin
module.exports.setWeightedGPA = catchAsync(async (req, res) => {
    try {
        const users = await Undergraduate.find({ results: { $exists: true } }, { results: 1 })
            .populate('results');

        for (const user of users) {
            const results = Object.entries(user.results._doc)
                .filter(([prop]) => prop.includes('CSC'))
                .map(([prop, grade]) => ({
                    courseUnit: prop,
                    creditValue: setCreditValue(prop),
                    gpv: gradeValue(grade)
                }))
                .filter(({ gpv }) => gpv !== null);

            const totalCredits = results.reduce((sum, { creditValue }) => sum + creditValue, 0);
            console.log(totalCredits);
            const gpvByCredit = results.reduce((sum, { creditValue, gpv }) => sum + creditValue * gpv, 0);
            const weightedGPA = gpvByCredit / totalCredits;

            console.log(weightedGPA);
            await Undergraduate.findByIdAndUpdate(user._id, { weightedGPA });
        }
        res.status(200).json({ message: 'GPA calculation completed' });
    } catch (err) {
        console.log(err);
        console.log(err);
        res.status(500).json({ error: 'An error occurred while calculating GPAs.' });
    }
});

// 🛑 This is a tempory route controller. just for checking 🛑
// Method = PATCH
// Endpoint = "/add-intern-status"
// Description = add intern status
module.exports.addInternStatus = catchAsync(async (req, res) => {
    try {
        const userId = req.body.id // 🛑 user id must get from jwt in future 🛑
        const { companyId, newStatus } = req.body;

        const user = await Undergraduate.findById(userId);

        if (!user) {
            res.status(404).json({ message: "user not found!" });
        }
        else {
            const company = await Company.findById(companyId);

            if (!company) {
                res.status(404).json({ message: "company not found" });
            }
            else {
                const existingInternStatus = user.internStatus.filter((status) => {
                    return status.company.equals(companyId);
                });

                if (existingInternStatus) {
                    res.status(400).json({ message: "Error! User already listed on that company" });
                } else {
                    const newInternSatatus = { company: companyId, status: newStatus };

                    const updatedUser = await Undergraduate.findByIdAndUpdate(
                        userId,
                        { $push: { internStatus: newInternSatatus } },
                        { new: true }
                    );

                    if (updatedUser) {
                        res.status(200).json(updatedUser.internStatus);
                    }
                    else {
                        res.status(400).json("error");
                    }
                }
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);

    }
});

// Method = PATCH
// Endpoint = "/intern/status"
// Description = Update intern status
// User: undergraduate
module.exports.updateInternStatus = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;
        const { companyId, newStatus } = req.body;

        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ error: "company not found" });
        }

        // console.log(user.internStatus);
        const existingInternStatus = user.internStatus.findOne((status) => { return status.company.equals(companyId) });
        console.log(existingInternStatus);
        if (!existingInternStatus) {
            return res.status(400).json({ error: "user hasn't listed on that company" });
        }

        // const newInternSatatus = {status: newStatus };
        const updatedUser = await Undergraduate.findOneAndUpdate(
            { _id: userId, "internStatus._id": existingInternStatus._id },
            { $set: { "internStatus.$.status": newStatus } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(400).json({ error: "update failed" });
        }

        res.status(201).json(updatedUser.internStatus);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Method: GET
// Endpoint: "/intern/assign-supervisor/:undergraduateId"
// Description: get companies and supervisors for assign-supervisor form
// User: admin
module.exports.assignSupervisorGET = catchAsync(async (req, res) => {
    try {
        const userId = req.params.undergraduateId;

        const user = await Undergraduate.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ error: "undergraduate not found!" });
        }

        const company = await Company.findById(user.internship.company).populate('supervisors');
        if (!company) {
            return res.status(404).json({ error: "company not found!" });
        }

        console.log(company);
        res.status(200).json({ user, company });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Method: PATCH
// Endpoint: "/intern/assign-supervisor/:undergraduateId"
// Description: Assign a supervisor for undergraduate
// User: admin
module.exports.assignSupervisorPATCH = catchAsync(async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const userId = req.params.undergraduateId;
        const { supervisorId } = req.body;

        const user = await Undergraduate.findById(userId).select("-password").session(session);
        if (!user) {
            await session.abortTransaction();
            return res.status(404).json({ error: "undergraduate not found!" });
        }
        console.log(user.name);

        const supervisor = await Supervisor.findById(supervisorId).session(session);
        if (!supervisor) {
            await session.abortTransaction();
            return res.status(404).json({ error: "supervisor not found" });
        }
        console.log(supervisor);

        user.supervisor = supervisor._id;


        const currentInterns = supervisor.interns.filter((id) => {
            return !id.equals(user._id);
        });

        currentInterns.push(user);
        supervisor.interns = currentInterns;

        await user.save({ session });
        await supervisor.save({ session });

        await session.commitTransaction();

        console.log(user);
        res.status(201).json({ message: "assigned supervisor successfully", supervisor });
    } catch (err) {
        await session.abortTransaction();
        console.log(err);
        res.status(500).json(err);
    } finally {
        session.endSession();
    }
});

// Method: PATCH
// Endpoint: "/intern/internship"
// Description: Update intern start date and end date, then generate empty weekly reports
// User: undergraduate
module.exports.updateInternship = catchAsync(async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const userId = req.user.id;
        const { companyId, jobRole, type, internshipStart, internshipEnd } = req.body;

        const user = await Undergraduate.findById(userId).session(session);
        const company = await Company.findById(companyId).session(session);
        if (!user) {
            await session.abortTransaction();
            return res.status(404).json({ error: "user not found!" });
        }

        if (!internshipStart || !internshipEnd) {
            await session.abortTransaction();
            return res.status(400).json({ error: "Please add intern start date and end date" });
        }

        if (!company) {
            await session.abortTransaction();
            return res.status(404).json({ error: "company not found!" });
        }

        // Generate empty weekly reports for the intern
        const startOfWeekDate = startOfWeek(new Date(internshipStart), { weekStartsOn: 2 }); //monday the weekstart
        const endOfWeekDate = endOfWeek(new Date(internshipEnd), { weekStartsOn: 2 });
        const emptyWeeklyReports = [];

        let currentWeekDate = startOfWeekDate;
        let weekNumber = 1;

        while (currentWeekDate < endOfWeekDate) {
            const weekStartDate = new Date(currentWeekDate);
            const weekEndDate = addDays(currentWeekDate, 6); // sunday the weekend

            const emptyDailyReports = [];
            let dayNumber = 1;
            let currentDate = new Date(currentWeekDate);

            while (dayNumber <= 7) {
                const emptyDailyReport = {
                    dayNumber,
                    date: currentDate,
                    content: '',
                    approvedStatus: 'empty',
                };

                emptyDailyReports.push(emptyDailyReport);
                dayNumber++;
                currentDate = addDays(currentDate, 1);
            }

            const emptyWeeklyReport = {
                weekNumber,
                weekStartDate,
                weekEndDate,
                dailyReports: emptyDailyReports,
                problemSection: '',
                reportStatus: 'empty'
            };

            emptyWeeklyReports.push(emptyWeeklyReport);
            weekNumber++;
            currentWeekDate = addWeeks(currentWeekDate, 1);
        }

        //Generate empty monthly reports
        const startofMonth = startOfMonth(new Date(internshipStart));
        const endofMonth = endOfMonth(new Date(internshipEnd));
        const emptyMonthlyReports = [];

        let currentMonth = startofMonth;
        let monthNumber = 1;

        while (currentMonth < endofMonth) {
            const monthStartDate = startOfMonth(currentMonth);
            const monthEndDate = endOfMonth(currentMonth);

            const emptyWeeklyReports = [];
            let weekNumber = 1;

            // Generate empty weekly reports for month

            while (weekNumber < getWeeksInMonth(currentMonth)) {
                const weekStartDate = startOfWeek(addWeeks(monthStartDate, weekNumber - 1), { weekStartsOn: 2 });
                const weekEndDate = endOfWeek(addWeeks(monthStartDate, weekNumber - 1), { weekStartsOn: 2 });

                const emptyWeeklyReport = {
                    weekNumber,
                    weekStartDate,
                    weekEndDate,
                    content: '',
                    approvalStatus: 'empty'
                };

                emptyWeeklyReports.push(emptyWeeklyReport);
                weekNumber++;
            }

            const emptyMonthlyReport = {
                monthNumber,
                monthStartDate,
                monthEndDate,
                weeklyReports: emptyWeeklyReports,
                problemSection: '',
                leaveRecord: {
                    absentDays: 0,
                    approvalStatus: 'empty'
                },
                reportStatus: 'empty'
            };

            emptyMonthlyReports.push(emptyMonthlyReport);
            monthNumber++;
            currentMonth = addMonths(currentMonth, 1);
        }

        user.internship.company = company._id;
        user.internship.internshipStart = internshipStart;
        user.internship.internshipEnd = internshipEnd;
        user.internship.jobRole = jobRole;
        user.internship.type = type;
        user.weeklyReports = emptyWeeklyReports;
        user.monthlyReports = emptyMonthlyReports;
        const companyInterns = company.interns;
        companyInterns.push(user);

        await user.save({ session });
        await company.save({ session });

        await session.commitTransaction();

        res.status(201).json({ message: "internship update successfully", candidate });

    } catch (err) {
        await session.abortTransaction();
        console.log(err);
        res.status(500).json(err);
    } finally {
        session.endSession();
    }
});

// ############################## Daily Reports ##############################

// Method: GET
// Endpoint: "/daily-report/all"
// Description: View all daily reports weekly vise
// User: undergraduate
module.exports.viewAllDailyReports = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        if (user.weeklyReports.length === 0) {
            return res.status(400).json({ message: "please set the internship" });
        }

        res.status(200).json({ dailyReports: user.weeklyReports });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Method: GET
// Endpoint: "/daily-report/:weekNo"
// Description: View a set of daily reports weekly vise
// User: undergraduate
module.exports.viewDailyReport = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;
        const weekNo = parseInt(req.params.weekNo);
        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        if (user.weeklyReports.length === 0) {
            return res.status(400).json({ error: "please set the internship" });
        }

        const report = user.weeklyReports.findOne((report) => { return report.weekNumber === weekNo });

        res.status(200).json({ weeklyReport: report });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Method: POST
// Endpoint: "/daily-report"
// Description: View a set of daily reports weekly vise
// User: undergraduate
module.exports.editDailyReport = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;
        // const weekNo = parseInt(req.params.weekNo);
        const { weekNo, dayNo, reportContent } = req.body;
        // const dayNo = parseInt(req.body.dayNumber);

        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        if (user.weeklyReports.length === 0) {
            return res.status(400).json({ error: "please set the internship" });
        }

        const weeklyReport = user.weeklyReports.find((report) => report.weekNumber === weekNo);
        if (!weeklyReport) {
            return res.status(404).json({ error: "weekly report not found" });
        }

        const dailyReport = weeklyReport.dailyReports.find((report) => report.dayNumber === dayNo);
        if (!dailyReport) {
            return res.status(404).json({ error: "daily report not found" });
        }

        dailyReport.content = reportContent;
        dailyReport.approvalStatus = 'edited';
        weeklyReport.reportStatus = 'saved';
        await user.save();

        res.status(201).json({ dailyReport });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Method: POST
// Endpoint: "/daily-report/weekly-problem-section"
// Description: edit daily report weekly collection's problem encountered and solution section
// User: undergraduate 
module.exports.editDailyReportProblemSection = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;
        const { weekNo, problemContent } = req.body;

        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        if (user.weeklyReports.length === 0) {
            return res.status(400).json({ message: "please set the internship" });
        }

        const weeklyReport = user.weeklyReports.find((report) => report.weekNumber === weekNo);
        if (!weeklyReport) {
            return res.status(404).json({ error: "weekly report not found" });
        }

        weeklyReport.problemSection = problemContent;
        weeklyReport.reportStatus = 'saved';
        await user.save();

        res.status(201).json({ weeklyReport });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Method: PATCH
// Endpoint: "/daily-report/sumbit"
// Description: Submit the daily report
// User: undergraduate 
module.exports.submitDailyReport = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;
        const { weekNo } = req.body;

        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        if (user.weeklyReports.length === 0) {
            return res.status(400).json({ message: "please set the internship" });
        }

        const weeklyReport = user.weeklyReports.find((report) => report.weekNumber === weekNo);
        if (!weeklyReport) {
            return res.status(404).json({ error: "weekly report not found" });
        }

        weeklyReport.reportStatus = 'pending';
        await user.save();

        res.status(201).json({ weeklyReport });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Method: GET
// Endpoint: "/daily-report/all/:undergraduateId"
// Description: View all daily reports weekly vise
// User: admin
module.exports.getAllDailyReports = catchAsync(async (req, res) => {
    try {
        const undergraduateId = req.params.undergraduateId;
        const undergraduate = await Undergraduate.findById(undergraduateId);
        if (!undergraduate) {
            return res.status(404).json({ error: "undergraduate not found" });
        }

        if (undergraduate.weeklyReports.length === 0) {
            return res.status(404).json({ error: "no any reports" });
        }

        res.status(200).json({ dailyReports: undergraduate.weeklyReports });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Method: GET
// Endpoint: "/daily-report/:undergraduateId/week/:weekNo"
// Description: View a set of daily reports weekly vise
// User: admin
module.exports.getDailyReport = catchAsync(async (req, res) => {
    try {
        const undergraduateId = req.params.undergraduateId;
        const weekNo = parseInt(req.params.weekNo);

        const undergraduate = await Undergraduate.findById(undergraduateId);
        if (!undergraduate) {
            return res.status(404).json({ error: "undergraduate not found" });
        }

        if (undergraduate.weeklyReports.length === 0) {
            return res.status(404).json({ error: "no daily reports found" });
        }

        console.log(undergraduate);

        const report = undergraduate.weeklyReports.find((report) => report.weekNumber === weekNo);

        if (!report) {
            return res.status(404).json({ error: "daily report found" });
        }

        res.status(200).json({ weeklyReport: report });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// ############################## Monthly Reports ##############################

// Method: GET
// Endpoint: "/monthly-report/all"
// Description: View all monthly reports
// User: undergraduate
module.exports.viewAllMonthlyReports = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        if (user.monthlyReports.length === 0) {
            return res.status(400).json({ error: "please set the internship" });
        }

        res.status(200).json({ monthlyReports: user.monthlyReports });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Method: GET
// Endpoint: "/monthly-report/:monthNo"
// Description: View a monthly report
// User: undergraduate
module.exports.viewMonthlyReport = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;
        const monthNo = parseInt(req.params.monthNo);
        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        if (user.monthlyReports.length === 0) {
            return res.status(400).json({ error: "please set the internship" });
        }

        const report = user.monthlyReports.filter((report) => report.monthNumber === monthNo);

        res.status(200).json({ monthlyReport: report });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Method: POST
// Endpoint: "/monthly-report/week"
// Description: edit a weekly report in monthly report
// User: undergraduate
module.exports.editMonthlyReportWeek = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;
        const { weekNo, monthNo, reportContent } = req.body;

        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        if (user.monthlyReports.length === 0) {
            return res.status(400).json({ error: "please set the internship" });
        }

        const monthlyReport = user.monthlyReports.find((report) => report.monthNumber === monthNo);
        if (!monthlyReport) {
            return res.status(404).json({ error: "moonthly report not found" });
        }

        const weeklyReport = monthlyReport.weeklyReports.find((report) => report.weekNumber === weekNo);
        if (!dailyReport) {
            return res.status(404).json({ error: "weekly report not found" });
        }

        weeklyReport.content = reportContent;
        weeklyReport.approvalStatus = 'edited';
        monthlyReport.reportStatus = 'saved';
        await user.save();

        res.status(201).json({ monthlyReport });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Method: POST
// Endpoint: "/monthly-report/monthly-problem-section"
// Description: edit monthly report problem encountered and solution section
// User: undergraduate
module.exports.editMonthlyProblemSection = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;
        const { monthNo, problemContent } = req.body;

        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(401).json({ error: "user not found" });
        }

        if (user.monthlyReports.length === 0) {
            return res.status(400).json({ error: "please set the internship" });
        }

        const monthlyReport = user.monthlyReports.find((report) => report.monthNumber === monthNo);
        if (!monthlyReport) {
            return res.status(401).json({ error: "monthly report not found" });
        }

        monthlyReport.problemSection = problemContent;
        monthlyReport.reportStatus = 'saved';
        await user.save();

        res.status(201).json({ monthlyReport });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Method: POST
// Endpoint: "/monthly-report/leave-record"
// Description: edit nomber of leaves in month
// User: undergraduate
module.exports.editMonthlyLeaveRecord = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;
        const { monthNo, absentDays } = req.body;

        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        if (user.monthlyReports.length === 0) {
            return res.status(400).json({ error: "please set the internship" });
        }

        const monthlyReport = user.monthlyReports.find((report) => report.monthNumber === monthNo);
        if (!monthlyReport) {
            return res.status(404).json({ error: "monthly report not found" });
        }

        monthlyReport.leaveRecord.absentDays = absentDays;
        monthlyReport.reportStatus = 'saved';
        await user.save();

        res.status(201).json({ monthlyReport });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Method: PATCH
// Endpoint: "/monthly-report/submit"
// Description: edit nomber of leaves in month
// User: undergraduate
module.exports.submitMonthlyReport = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;
        const { monthNo } = req.body;

        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        if (user.monthlyReports.length === 0) {
            return res.status(400).json({ error: "please set the internship" });
        }

        const monthlyReport = user.monthlyReports.find((report) => report.monthNumber === monthNo);
        if (!monthlyReport) {
            return res.status(404).json({ error: "monthly report not found" });
        }

        monthlyReport.reportStatus = 'pending';
        await user.save();

        res.status(201).json({ monthlyReport });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Method: GET
// Endpoint: "/monthly-report/all/:undergraduateId"
// Description: View all monthly reports
// User: admin
module.exports.getAllMonthlyReports = catchAsync(async (req, res) => {
    try {
        const undergraduateId = req.params.undergraduateId;
        const undergraduate = await Undergraduate.findById(undergraduateId);
        if (!undergraduate) {
            return res.status(404).json({ error: "undergraduate not found" });
        }

        if (undergraduate.monthlyReports.length === 0) {
            return res.status(404).json({ error: "no any monthly reports" });
        }

        res.status(200).json({ monthlyReports: undergraduate.monthlyReports });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Method: GET
// Endpoint: "/monthly-report/:undergraduateId/month/:monthNo"
// Description: View monthly a report
// User: admin
module.exports.getMonthlyReport = catchAsync(async (req, res) => {
    try {
        const undergraduateId = req.params.undergraduateId;
        const monthNo = parseInt(req.params.monthNo);

        const undergraduate = await Undergraduate.findById(undergraduateId);
        if (!undergraduate) {
            return res.status(404).json({ error: "undergraduate not found" });
        }

        if (undergraduate.monthlyReports.length === 0) {
            return res.status(404).json({ error: "no any monthly reports found" });
        }

        const report = undergraduate.monthlyReports.findOne((report) => report.monthNumber === monthNo);

        if (!report) {
            return res.status(404).json({ error: "monthly report found" });
        }

        res.status(200).json({ monthlyReport: report });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// ############################## CV Application / Additional Information ##############################

// Method: POST
// Endpoint: "/cv/upload"
// Description: upload the cv as the pdf to local files
// User: undergraduate
module.exports.uploadCV = catchAsync(async (req, res) => {
    try {
        const filePath = `files/pdf/${req.file.filename}`;
        fs.renameSync(req.file.path, filePath);

        if (!filePath) {
            console.log('not uploaded');
        }

        const userId = req.user.id;

        const user = await Undergraduate.findByIdAndUpdate(
            userId,
            { cvURL: filePath },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        console.log('success');
        res.status(201).json({
            user,
            message: "CV uploaded successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// Method: POST
// Endpoint: "/info/soft-skill"
// Description: Update the profile with additional information about undergraduate
// User: undergraduate
module.exports.addSoftSkill = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;
        const { skill } = req.body;

        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        const softSkills = user.additionalInformation.softSkills
        const existSkill = softSkills.filter(s => { return s === skill });
        if (existSkill) {
            return res.status(200).json({
                softSkills: user.additionalInformation.softSkills,
                message: "skill already exist"
            })
        }

        softSkills.push(skill);
        user.additionalInformation.softSkills = softSkills;
        user.save();

        res.status(201).json({ softSkills: user.additionalInformation.softSkills });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Method: DELETE
// Endpoint: "/info/soft-skill"
// Description: Update the profile with additional information about undergraduate
// User: undergraduate
module.exports.deleteSoftSkill = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;
        const { skill } = req.body;

        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        const softSkills = user.additionalInformation.softSkills;
        const skillIndex = softSkills.indexOf(skill);
        if (skillIndex === -1) {
            return res.status(404).json({ error: "soft skill not found" });
        }

        softSkills.splice(skillIndex, 1);
        user.additionalInformation.softSkills = softSkills;
        user.save();

        res.status(203).json({ softSkills: user.additionalInformation.softSkills });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Method: POST
// Endpoint: "/info/technology-skill"
// Description: Update the profile with additional information about undergraduate
// User: undergraduate
module.exports.addTechnologySkill = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, level } = req.body;

        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        const technologies = user.additionalInformation.technologies;
        const existTechnologies = technologies.filter(s => { return s.name !== name });

        existTechnologies.push({ name, level });
        user.additionalInformation.technologies = existTechnologies;
        user.save();

        res.status(201).json({ technologies: user.additionalInformation.technologies });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// Method: DELETE
// Endpoint: "/info/technology-skill"
// Description: Update the profile with additional information about undergraduate
// User: undergraduate
module.exports.deleteTechnologySkill = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;
        const { name } = req.body;

        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        const technologies = user.additionalInformation.technologies;
        const skillIndex = technologies.findIndex((tech) => { return tech.name === name });
        if (skillIndex === -1) {
            return res.status(404).json({ error: "technology skill not found" });
        }

        technologies.splice(skillIndex, 1);
        user.additionalInformation.technologies = technologies;
        user.save();

        res.status(203).json({ technologies: user.additionalInformation.technologies });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Method: POST
// Endpoint: "/info/certifications"
// Description: Update the profile with additional information about undergraduate
// User: undergraduate
module.exports.addCertifications = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, issuedBy } = req.body;

        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        const certifications = user.additionalInformation.certifications;
        const existCertifications = certifications.filter(c => { return c.name !== name });

        existCertifications.push({ name, issuedBy });
        user.additionalInformation.certifications = existCertifications;
        user.save();

        res.status(201).json({ certifications: user.additionalInformation.certifications });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// Method: DELETE
// Endpoint: "/info/certifications"
// Description: Update the profile with additional information about undergraduate
// User: undergraduate
module.exports.deleteCertifications = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;
        const { name } = req.body;

        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        const certifications = user.additionalInformation.certifications;
        const certificationIndex = certifications.findIndex((c) => { return c.name === name });
        if (certificationIndex === -1) {
            return res.status(404).json({ error: "certification not found" });
        }

        certifications.splice(certificationIndex, 1);
        user.additionalInformation.certifications = certifications;
        user.save();

        res.status(203).json({ certifications: user.additionalInformation.certifications });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Method: POST
// Endpoint: "/info/extra-activities"
// Description: Update the profile with additional information about undergraduate
// User: undergraduate
module.exports.addExtraActivities = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, year, description } = req.body;

        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        const extraActivities = user.additionalInformation.extraActivities;
        const existExtraActivities = extraActivities.filter(a => { return a.name !== name });

        existExtraActivities.push({ name, year, description });
        user.additionalInformation.extraActivities = existExtraActivities;
        user.save();

        res.status(201).json({ extraActivities: user.additionalInformation.extraActivities });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// Method: DELETE
// Endpoint: "/info/extra-activities"
// Description: Update the profile with additional information about undergraduate
// User: undergraduate
module.exports.deleteExtraActivities = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;
        const { name } = req.body;

        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        const extraActivities = user.additionalInformation.extraActivities;
        const extraActivitiesIndex = extraActivities.findIndex((a) => { return a.name === name });
        if (extraActivitiesIndex === -1) {
            return res.status(404).json({ error: "extra activity not found" });
        }

        extraActivities.splice(extraActivitiesIndex, 1);
        user.additionalInformation.extraActivities = extraActivities;
        user.save();

        res.status(203).json({ extraActivities: user.additionalInformation.extraActivities });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Method: POST
// Endpoint: "/info/projects"
// Description: Update the profile with additional information about undergraduate
// User: undergraduate
module.exports.addProject = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, year, description, languages, links } = req.body;

        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        const projects = user.additionalInformation.projects;
        const existProjects = projects.filter(a => { return a.name !== name });

        existProjects.push({ name, year, description, languages, links });
        user.additionalInformation.projects = existProjects;
        user.save();

        res.status(201).json({ projects: user.additionalInformation.projects });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// Method: DELETE
// Endpoint: "/info/projects"
// Description: Update the profile with additional information about undergraduate
// User: undergraduate
module.exports.deleteProject = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;
        const { name } = req.body;

        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        const projects = user.additionalInformation.projects;
        const projectsIndex = projects.findIndex((a) => { return a.name === name });
        if (projectsIndex === -1) {
            return res.status(404).json({ error: "project not found" });
        }

        projects.splice(projectsIndex, 1);
        user.additionalInformation.projects = projects;
        user.save();

        res.status(203).json({ projects: user.additionalInformation.projects });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Method: POST
// Endpoint: "/info/english-skill"
// Description: Update the profile with additional information about undergraduate
// User: undergraduate
module.exports.addEnglishSkill = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;
        const { odinaryLevel, advancedLevel, level01, level02, courses } = req.body;

        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        user.additionalInformation.englishSkill = {
            odinaryLevel,
            advancedLevel,
            level01,
            level02,
            courses
        };

        user.save();

        res.status(201).json({ englishSkill: user.additionalInformation.englishSkill });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Method: GET
// Endpoint: "/info"
// Description: Update the profile with additional information about undergraduate
// User: undergraduate
module.exports.getAdditionalInformation = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        res.status(200).json({ additionalInformation: user.additionalInformation });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


// ############################## Progress Report ##############################

// Method: POST
// Endpoint: "/progress-report/:internId"
// Description: add the progress report for industrial training
// User: supervisor
module.exports.addProgressReport = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await Supervisor.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        const internId = req.params.internId;
        const { establishment, startDate, endDate, comments, leaves, status } = req.body;
        // comments = {conduct, attendance, attitude}
        // leaves = {total, authorized, unauthorized}
        // status = 'saved' or 'submitted'

        const intern = await Undergraduate.findById(internId);
        if (!intern) {
            return res.status(404).json({ error: "intern not found" });
        }


        if (!intern.supervisor === user._id) {
            return res.status(400).json({ error: "this intern is not assigned to you" });
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


        res.status(201).json({ progressReport: intern.progressReport });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Method: GET
// Endpoint: "/progress-report/:internId"
// Description: get the progress report for industrial training
// User: supervisor, admin, undergraduate
module.exports.getProgressReport = catchAsync(async (req, res) => {
    try {
        const internId = req.params.internId;

        const intern = await Undergraduate.findById(internId);
        if (!intern) {
            return res.status(404).json({ error: "intern not found" });
        }

        res.status(200).json({ progressReport: intern.progressReport });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// ############################## Final Feedback ##############################

// Method: POST
// Endpoint: "/final-feedback/:internId"
// Description: add the final feedback report for industrial training
// User: supervisor
module.exports.addFinalFeedback = catchAsync(async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await Supervisor.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        const internId = req.params.internId;
        const {
            attendanceAndPunctuality,
            communicationSkills,
            practicalApplication,
            problemSolvingSkills,
            multiPerspectiveView,
            teamWork,
            leadership,
            attitudeAndBehavior,
            ethicalBehavior,
            overallPerformance,
            feedback
        } = req.body;
        // all rating values must be 1, 2, 3 or 4
        // feedback must be a String

        const intern = await Undergraduate.findById(internId);
        if (!intern) {
            return res.status(404).json({ error: "intern not found" });
        }


        if (!intern.supervisor === user._id) {
            return res.status(400).json({ error: "this intern is not assigned to you" });
        }

        intern.finalFeedback.rating = {
            attendanceAndPunctuality,
            communicationSkills,
            practicalApplication,
            problemSolvingSkills,
            multiPerspectiveView,
            teamWork,
            leadership,
            attitudeAndBehavior,
            ethicalBehavior,
            overallPerformance,
        };
        intern.finalFeedback.feedback = feedback;

        await intern.save();


        res.status(201).json({ finalFeedback: intern.finalFeedback });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Method: GET
// Endpoint: "/final-feedback/:internId"
// Description: get the final feedback report for industrial training
// User: supervisor, admin
module.exports.getFinalFeedback = catchAsync(async (req, res) => {
    try {
        const internId = req.params.internId;

        const intern = await Undergraduate.findById(internId);
        if (!intern) {
            return res.status(400).json({ error: "intern not found" });
        }

        res.status(200).json({ finalFeedback: intern.finalFeedback });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

