const Undergraduate = require('../models/Undergraduate');
const Company = require('../models/Company');
const handleErrors = require('../utils/appErrors');
const { default: mongoose } = require('mongoose');
const catchAsync = require('../utils/catchAsync');
const Supervisor = require('../models/Supervisor');
const { startOfWeek, endOfWeek, addWeeks, format, addDays, startOfMonth, endOfMonth, getWeeksInMonth, addMonths } = require('date-fns');
const fs = require('fs');

// Method = POST
// Endpoint = "/create-undergraduate"
// Description = create undergraduate user
module.exports.createUndergraduate = catchAsync(async (req, res) => {

    try {
        const { name, regNo, email, contactNo, password, gpa } = req.body;
        console.log(name);

        const user = await Undergraduate.create({ name, regNo, email, contactNo, password, gpa });

        if (!user) {
            return res.status(400).json({ message: "error! can't create the user!" });
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
//Endpoint: "/view-undergraduate-profile"
// Description: View Undegraduate Profile
module.exports.viewUndergraduateProfile = catchAsync(async (req, res) => {
    try {
        // const userId = req.body.id; // 🛑 user id must get from jwt in future 🛑
        const userId = req.params.undergraduateId;
        console.log(userId);
        const user = await Undergraduate.findById(userId);

        if (!user) {
            res.status(400).json({ message: "user not found!" })
        }
        else {
            res.status(200).json({ user });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ err })
    }
});



// Method = PATCH
// Endpoint = "/update-undergraduate-profile"
// Description = Update undergraduate profile
module.exports.updateUndergraduateProfile = catchAsync(async (req, res) => {
    try {
        const userId = res.locals.user.id;
        const { email, contactNo, linkdinURL, githubURL, internStatus } = req.body;

        const filePath = `files/images/${req.file.filename}`;
        fs.renameSync(req.file.path, filePath);

        if (!filePath) {
            console.log('image not uploaded');
        }

        const user = await Undergraduate.findByIdAndUpdate(
            userId,
            {
                email,
                contactNo,
                linkdinURL,
                githubURL,
                internStatus,
                profileImage: filePath
            },
            { new: true }
        );

        if (!user) {
            return res.status(400).json({ error: "user not found" });
        }

        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Method = GET
// Endpoint = "/view-all-users/:userType"
// Description = View all users by user type
module.exports.viewInternList = catchAsync(async (req, res) => {
    try {
        const users = await Undergraduate.find().select('name regNo gpa weightedGPA internStatus');

        res.status(200).json({ users });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
});



// Method = PATCH
// Endpoint = "/company-selection"
// Description = Select companies for internship
module.exports.companySelection = catchAsync(async (req, res) => {
    try {
        const userId = req.body.id; // 🛑 user id must get from jwt in future 🛑
        const { company01, jobRole01, company02, jobRole02, company03, jobRole03 } = req.body;

        // check user is exist
        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "user not found!" });
        }

        // check companies are exist
        const foundCompany01 = await Company.findById(company01);
        const foundCompany02 = await Company.findById(company02);
        const foundCompany03 = await Company.findById(company03);

        if (!foundCompany01 || !foundCompany02 || !foundCompany03) {
            return res.status(404).json({ message: "company not found" });
        }

        // check user inputs are unique or not
        if (company01 === company02 || company01 === company03 || company02 === company03) {
            return res.status(400).json({ message: "can not apply same company twice" });
        }

        // // compare new inputs with already added values | oc - old companies
        // const oc01 = user.companySelection01.companyId;
        // const oc02 = user.companySelection02.companyId;
        // const oc03 = user.companySelection03.companyId;

        // if (company01 === oc01.toString() || company01 === oc02.toString() || company01 === oc03.toString()) {
        //     return res.status(400).json({ message: "user already apply for company 01" });
        // }
        // if (company02 === oc01.toString() || company02 === oc02.toString() || company02 === oc03.toString()) {
        //     return res.status(400).json({ message: "user already apply for company 02" });
        // }
        // if (company03 === oc01.toString() || company03 === oc02.toString() || company03 === oc03.toString()) {
        //     return res.status(400).json({ message: "user already apply for company 03" });
        // }

        const updatedUser = await Undergraduate.findByIdAndUpdate(
            userId,
            {
                $set: {
                    'companySelection01.companyId': company01,
                    'companySelection01.jobRole': jobRole01,
                    'companySelection02.companyId': company02,
                    'companySelection02.jobRole': jobRole02,
                    'companySelection03.companyId': company03,
                    'companySelection03.jobRole': jobRole03,

                }
            },
            { new: true }
        );

        if (updatedUser) {
            res.status(200).json(updatedUser);
        }
        else {
            res.status(400).json("error");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Method = GET
// Endpoint = "/undergraduate-dashboard"
// Description = Undergraduate Dashboard
module.exports.undergraduateDashboard = catchAsync(async (req, res) => {
    try {
        const userId = res.locals.user.id // 🛑 user id must get from jwt in future 🛑

        // get all data exept password
        const user = await Undergraduate.findById(userId).select('-password');

        if (user) {
            //get all companies
            const companies = await Company.find();

            res.status(200).json({ user, companies });
        } else {
            res.status(404).json({ message: "user not found!" });
        }
    } catch (err) {
        res.status(500).json({ message: "server error!" });
    }
});

// Method = PATCH
// Endpoint = "/add-note"
// Description = Add a note
module.exports.addNote = catchAsync(async (req, res) => {
    try {
        const userId = req.body.id // 🛑 user id must get from jwt in future 🛑

        const { title, content } = req.body;

        if (!content) {
            res.status(400).json({ message: "Please add some content" });
        }
        else {
            const newNote = { title, content };
            const user = await Undergraduate.findByIdAndUpdate(userId, { $push: { notes: newNote } }, { new: true });

            if (!user) {
                res.status(404).json({ message: "user not found!" });
            }
            else {
                res.status(200).json(user.notes);
            }
        }
    } catch (err) {
        res.status(500).json(err);
    }
});
// Method = GET
// Endpoint = "/view-notes"
// Description = View notes
module.exports.viewNotes = catchAsync(async (req, res) => {
    try {
        const userId = req.body.id // 🛑 user id must get from jwt in future 🛑

        const user = await Undergraduate.findById(userId).select('-password');

        if (!user) {
            res.status(404).json({ message: "user not found" });
        }
        else {
            const notes = user.notes;
            if (!notes) {
                res.status(404).json({ message: "notes not found" });
            } else {
                res.status(200).json(notes);
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});

// Method: GET
// Endpoint = "/view-note"
// Description = View a note
module.exports.viewNote = catchAsync(async (req, res) => {
    try {
        const userId = req.body.id // 🛑 user id must get from jwt in future 🛑
        const noteId = req.body.noteId // 🛑 noteId can also parse and get from req.params 🛑

        const user = await Undergraduate.findById(userId).select('-password');

        if (!user) {
            res.status(404).json({ message: "user not found" });
        }
        else {
            const note = user.notes.id(noteId);
            if (!note) {
                res.status(404).json({ message: "note not found" });
            } else {
                res.status(200).json(note);
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});

// Method = GET
// Endpoint = "/edit-note"
// Description = Edit a note
module.exports.editNote = catchAsync(async (req, res) => {
    try {
        const userId = req.body.id // 🛑 user id must get from jwt in future 🛑
        const { noteId, newTitle, newContent } = req.body;

        const user = await Undergraduate.findById(userId).select('-password');

        if (!user) {
            res.status(404).json({ message: "user not found" });
        }
        else {
            const updatedUser = await Undergraduate.findOneAndUpdate(
                { _id: userId, "notes._id": noteId },
                {
                    $set:
                    {
                        "notes.$.title": newTitle,
                        "notes.$.content": newContent
                    }
                }, { new: true });

            if (!user) {
                res.status(404).json({ message: "error in updating note" });
            } else {
                res.status(200).json(updatedUser.notes);
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Method: POST
// Endpoint: "/add-result"
// Description: Add results of undergraduate
module.exports.addResult = catchAsync(async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        // //set the storage engine for multer
        // const storage = multer.diskStorage({
        //     destination: (req, res, cb) => {
        //         cb(null, '../files/');
        //     },
        //     filename: (req, file, cb) => {
        //         // cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        //         cb(null, file.fieldname + '-' + Date.now() + ".xlsx");

        //     }
        // });

        // //initialize multer middleware with storage engine and filter
        // const upload = multer({
        //     storage: storage,
        //     // fileFilter: (req, file, cb) => {
        //     //     const filetypes = /xlsx/;
        //     //     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        //     //     const mimetype = filetypes.test(file.mimetype);
        //     //     if (extname && mimetype) {
        //     //         return cb(null, true);
        //     //     } else {
        //     //         console.log(file);
        //     //         cb('Error! Please upload a valid .xlsx file');
        //     //     }
        //     // }
        // });

        // // handle file uploads
        // let filePath;
        // upload.single('file')(req, res, (err) => {
        //     console.log(req.file);
        //     if (err) {
        //         console.log(err);
        //         return res.status(500).json(err);
        //     }
        //     filePath = req.file.path;
        //     console.log("File uploaded successfully");
        //     console.log(filePath);

        //     // convert xlsx file into a json file
        //     const resultbook = xlsx.readFile(path.join(__dirname, filePath));
        //     const resultSheet = resultbook.Sheets[resultbook.SheetNames[0]];

        //     const resultDoc = xlsx.utils.sheet_to_json(resultSheet);
        //     console.log(resultDoc);

        //     for (const result of resultDoc) {
        //         const doc = new Result(result);
        //         doc.save((err, createdResult) => {
        //             if (err) {
        //                 console.log(err.message);
        //             }
        //             console.log("Saved document", createdResult);
        //             res.status(200).json(createdResult);
        //         })
        //     }
        // })

        // convert xlsx file into a json file
        const resultbook = xlsx.readFile(path.join(__dirname, '../files/resultdata.xlsx'));
        const resultSheet = resultbook.Sheets[resultbook.SheetNames[0]];

        const resultJson = xlsx.utils.sheet_to_json(resultSheet);
        console.log(resultJson);

        const results = await Result.create(resultJson, { session });

        // need to consider handling multiple documents saving in DB. like transaction ⚡

        for (const result of results) {
            const filter = { regNo: result.regNo };
            const updates = { $set: { results: result._id } };
            const user = await Undergraduate.findOneAndUpdate(filter, updates, { session });
            console.log(user);
            if (!user) {
                throw new Error(`Undergraduate with regNo ${result.regNo} not found!`);
            }

            console.log(`Result ${result._id} saved for student ${user._id}`);

        }

        await session.commitTransaction();
        res.status(200).json(results);

    } catch (err) {
        await session.abortTransaction();
        console.log(err);
    } finally {
        session.endSession();
    }
});

// Method: PATCH
// Endpoint: "/set-weigted-gpa"
// Description: Set wiighted gpa for undergraduate
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
        res.status(500).json({ message: 'An error occurred while calculating GPAs.' });
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
// Endpoint = "/update-intern-status"
// Description = Update intern status
module.exports.updateInternStatus = catchAsync(async (req, res) => {
    try {
        const userId = req.body.id // 🛑 user id must get from jwt in future 🛑
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

        res.status(200).json(updatedUser.internStatus);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Method: GET
// Endpoint: "/assign-supervisor"
// Description: Send companies and supervisors for assign-supervisor form
module.exports.assignSupervisorGET = catchAsync(async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await Undergraduate.findById(userId).select("-password");
        const companies = await Company.find();
        const supervisors = await Supervisor.find();
        if (!user) {
            return res.status(404).json({ message: "user not found!" });
        }
        console.log(companies, supervisors);
        res.status(200).json({ companies, supervisors });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//Method: PATCH
//Endpoint: "/assign-supervisor"
//Description: Assign a supervisor for undergraduate
module.exports.assignSupervisorPATCH = catchAsync(async (req, res) => {
    try {
        const { userId, supervisorId } = req.body;

        const user = await Undergraduate.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "user not found!" });
        }

        if (user.supervisor) {
            return res.status(400).json({ message: "User already assigned to a sipervisor", supervisor: user.supervisor });
        }

        const supervisor = await Supervisor.findById(supervisorId);
        if (!supervisor) {
            return res.status(404).json({ message: "supervisor not found" });
        }

        const assignment = await user.updateOne({ supervisor }, { new: true });
        if (!assignment) {
            return res.status(400).json({ message: "error happen when updating user" })
        }

        console.log(user);
        res.status(200).json({ message: "assigned supervisor successfully", user });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//Method: PATCH
//Endpoint: "/update-internship"
//Description: Update intern start date and end date, then generate empty weekly reports
module.exports.updateInternship = catchAsync(async (req, res) => {
    try {
        console.log('development start');
        const userId = req.body.id // 🛑 user id must get from jwt in future 🛑
        const { companyId, jobRole, type, internshipStart, internshipEnd } = req.body;

        const user = await Undergraduate.findById(userId);
        const company = await Company.findById(companyId);
        if (!user) {
            return res.status(404).json({ error: "user not found!" });
        }

        if (!internshipStart || !internshipEnd) {
            return res.status(400).json({ error: "Please add intern start date and end date" });
        }

        if (!company) {
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

        await user.save();
        res.status(200).json({ message: "internship update successfully", candidate });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


//Method: GET
//Endpoint: "/view-all-daily-reports"
//Description: View all daily reports weekly vise
module.exports.viewAllDailyReports = catchAsync(async (req, res) => {
    try {
        const userId = req.body.id;
        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(400).json({ error: "user not found" });
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

//Method: GET
//Endpoint: "/view-daily-report"
//Description: View a set of daily reports weekly vise
module.exports.viewDailyReport = catchAsync(async (req, res) => {
    try {
        const userId = req.body.id;
        // const weekNo = req.body.weekNumber;
        const weekNo = parseInt(req.body.weekNumber);
        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(400).json({ error: "user not found" });
        }

        if (user.weeklyReports.length === 0) {
            return res.status(400).json({ message: "please set the internship" });
        }

        const report = user.weeklyReports.filter((report) => report.weekNumber === weekNo);

        res.status(200).json({ weeklyReport: report });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//Method: POST
//Endpoint: "/edit-daily-report"
//Description: View a set of daily reports weekly vise
module.exports.editDailyReport = catchAsync(async (req, res) => {
    try {
        const userId = req.body.id;
        const { weekNo, dayNo, reportContent } = req.body;
        // const weekNo = parseInt(req.body.weekNumber);
        // const dayNo = parseInt(req.body.dayNumber);
        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(400).json({ error: "user not found" });
        }

        if (user.weeklyReports.length === 0) {
            return res.status(400).json({ message: "please set the internship" });
        }

        const weeklyReport = user.weeklyReports.find((report) => report.weekNumber === weekNo);
        if (!weeklyReport) {
            return res.status(400).json({ error: "weekly report not found" });
        }

        const dailyReport = weeklyReport.dailyReports.find((report) => report.dayNumber === dayNo);
        if (!dailyReport) {
            return res.status(400).json({ error: "daily report not found" });
        }

        dailyReport.content = reportContent;
        dailyReport.approvalStatus = 'edited';
        weeklyReport.reportStatus = 'saved';
        await user.save();

        res.status(200).json({ dailyReport });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


//Method: POST
//Endpoint: "/edit-weekly-report-problem-section"
//Description: 
module.exports.editDailyProblemSection = catchAsync(async (req, res) => {
    try {
        const userId = req.body.id;
        const { weekNo, problemContent } = req.body;

        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(400).json({ error: "user not found" });
        }

        if (user.weeklyReports.length === 0) {
            return res.status(400).json({ message: "please set the internship" });
        }

        const weeklyReport = user.weeklyReports.find((report) => report.weekNumber === weekNo);
        if (!weeklyReport) {
            return res.status(400).json({ error: "weekly report not found" });
        }

        weeklyReport.problemSection = problemContent;
        weeklyReport.reportStatus = 'saved';
        await user.save();

        res.status(200).json({ weeklyReport });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
// ........................
//Method: GET
//Endpoint: "/view-all-monthly-reports"
//Description: View all monthly reports
module.exports.viewAllMonthlyReports = catchAsync(async (req, res) => {
    try {
        const userId = req.body.id;
        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(400).json({ error: "user not found" });
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

//Method: GET
//Endpoint: "/view-monthly-report"
//Description: View a monthly
module.exports.viewMonthlyReport = catchAsync(async (req, res) => {
    try {
        const userId = req.body.id;
        // const weekNo = req.body.weekNumber;
        const weekNo = parseInt(req.body.weekNumber);
        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(400).json({ error: "user not found" });
        }

        if (user.weeklyReports.length === 0) {
            return res.status(400).json({ message: "please set the internship" });
        }

        const report = user.weeklyReports.filter((report) => report.weekNumber === weekNo);

        res.status(200).json({ weeklyReport: report });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//Method: POST
//Endpoint: "/edit-monthly-report-week"
//Description: edit a weekly report in monthly report
module.exports.editWeeklyReport = catchAsync(async (req, res) => {
    try {
        const userId = req.body.id;
        const { weekNo, dayNo, reportContent } = req.body;
        // const weekNo = parseInt(req.body.weekNumber);
        // const dayNo = parseInt(req.body.dayNumber);
        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(400).json({ error: "user not found" });
        }

        if (user.weeklyReports.length === 0) {
            return res.status(400).json({ message: "please set the internship" });
        }

        const weeklyReport = user.weeklyReports.find((report) => report.weekNumber === weekNo);
        if (!weeklyReport) {
            return res.status(400).json({ error: "weekly report not found" });
        }

        const dailyReport = weeklyReport.dailyReports.find((report) => report.dayNumber === dayNo);
        if (!dailyReport) {
            return res.status(400).json({ error: "daily report not found" });
        }

        dailyReport.content = reportContent;
        dailyReport.approvalStatus = 'edited';
        weeklyReport.reportStatus = 'saved';
        await user.save();

        res.status(200).json({ dailyReport });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


//Method: POST
//Endpoint: "/edit-monthly-report-problem-section"
//Description: 
module.exports.editMonthlyProblemSection = catchAsync(async (req, res) => {
    try {
        const userId = req.body.id;
        const { weekNo, problemContent } = req.body;

        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(400).json({ error: "user not found" });
        }

        if (user.weeklyReports.length === 0) {
            return res.status(400).json({ message: "please set the internship" });
        }

        const weeklyReport = user.weeklyReports.find((report) => report.weekNumber === weekNo);
        if (!weeklyReport) {
            return res.status(400).json({ error: "weekly report not found" });
        }

        weeklyReport.problemSection = problemContent;
        weeklyReport.reportStatus = 'saved';
        await user.save();

        res.status(200).json({ weeklyReport });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//Method: POST
//Endpoint: "/upload-cv"
//Description: upload the cv as the pdf to local files
module.exports.uploadCV = catchAsync(async (req, res) => {
    try {
        const filePath = `files/pdf/${req.file.filename}`;
        fs.renameSync(req.file.path, filePath);

        if (!filePath) {
            console.log('not uploaded');
        }

        const userId = res.locals.user.id;

        const user = await Undergraduate.findByIdAndUpdate(
            userId,
            { cvURL: filePath },
            { new: true }
        );

        if (!user) {
            return res.status(400).json({ error: "user not found" });
        }

        console.log('success');
        res.status(200).json({
            user,
            message: "CV uploaded successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//Method: POST
//Endpoint: "/update-additional-information"
//Description: Update the profile with additional information about undergraduate
module.exports.updateAdditionalInformation = catchAsync(async (req, res) => {
    try {
        const userId = req.body.id;
        // const userId = res.locals.user.id;
        const { addInfo } = req.body;

        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(400).json({ error: "user not found" });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//Method: POST
//Endpoint: "/soft-skill"
//Description: Update the profile with additional information about undergraduate
module.exports.addSoftSkill = catchAsync(async (req, res) => {
    try {
        const userId = req.body.id;
        // const userId = res.locals.user.id;
        const { skill } = req.body;

        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(400).json({ error: "user not found" });
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

        res.status(200).json({ softSkills: user.additionalInformation.softSkills });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//Method: DELETE
//Endpoint: "/soft-skill"
//Description: Update the profile with additional information about undergraduate
module.exports.deleteSoftSkill = catchAsync(async (req, res) => {
    try {
        const userId = req.body.id;
        // const userId = res.locals.user.id;
        const { skill } = req.body;

        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(400).json({ error: "user not found" });
        }

        const softSkills = user.additionalInformation.softSkills;
        const skillIndex = softSkills.indexOf(skill);
        if (skillIndex === -1) {
            return res.status(400).json({ error: "soft skill not found" });
        }

        softSkills.splice(skillIndex, 1);
        user.additionalInformation.softSkills = softSkills;
        user.save();

        res.status(200).json({ softSkills: user.additionalInformation.softSkills });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


//Method: POST
//Endpoint: "/technology-skill"
//Description: Update the profile with additional information about undergraduate
module.exports.addTechnologySkill = catchAsync(async (req, res) => {
    try {
        const userId = req.body.id;
        // const userId = res.locals.user.id;
        const { name, level } = req.body;

        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(400).json({ error: "user not found" });
        }

        const technologies = user.additionalInformation.technologies;
        const existTechnologies = technologies.filter(s => { return s.name !== name });

        existTechnologies.push({ name, level });
        user.additionalInformation.technologies = existTechnologies;
        user.save();

        res.status(200).json({ technologies: user.additionalInformation.technologies });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//Method: DELETE
//Endpoint: "/technology-skill"
//Description: Update the profile with additional information about undergraduate
module.exports.deleteTechnologySkill = catchAsync(async (req, res) => {
    try {
        const userId = req.body.id;
        // const userId = res.locals.user.id;
        const { name } = req.body;

        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(400).json({ error: "user not found" });
        }

        const technologies = user.additionalInformation.technologies;
        const skillIndex = technologies.findIndex((tech) => { return tech.name === name });
        if (skillIndex === -1) {
            return res.status(400).json({ error: "technology skill not found" });
        }

        technologies.splice(skillIndex, 1);
        user.additionalInformation.technologies = technologies;
        user.save();

        res.status(200).json({ technologies: user.additionalInformation.technologies });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//Method: POST
//Endpoint: "/certifications"
//Description: Update the profile with additional information about undergraduate
module.exports.addCertifications = catchAsync(async (req, res) => {
    try {
        const userId = req.body.id;
        // const userId = res.locals.user.id;
        const { name, issuedBy } = req.body;

        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(400).json({ error: "user not found" });
        }

        const certifications = user.additionalInformation.certifications;
        const existCertifications = certifications.filter(c => { return c.name !== name });

        existCertifications.push({ name, issuedBy });
        user.additionalInformation.certifications = existCertifications;
        user.save();

        res.status(200).json({ certifications: user.additionalInformation.certifications });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//Method: DELETE
//Endpoint: "/certifications"
//Description: Update the profile with additional information about undergraduate
module.exports.deleteCertifications = catchAsync(async (req, res) => {
    try {
        const userId = req.body.id;
        // const userId = res.locals.user.id;
        const { name } = req.body;

        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(400).json({ error: "user not found" });
        }

        const certifications = user.additionalInformation.certifications;
        const certificationIndex = certifications.findIndex((c) => { return c.name === name });
        if (certificationIndex === -1) {
            return res.status(400).json({ error: "certification not found" });
        }

        certifications.splice(certificationIndex, 1);
        user.additionalInformation.certifications = certifications;
        user.save();

        res.status(200).json({ certifications: user.additionalInformation.certifications });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//Method: POST
//Endpoint: "/extra-activities"
//Description: Update the profile with additional information about undergraduate
module.exports.addExtraActivities = catchAsync(async (req, res) => {
    try {
        const userId = req.body.id;
        // const userId = res.locals.user.id;
        const { name, year, description } = req.body;

        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(400).json({ error: "user not found" });
        }

        const extraActivities = user.additionalInformation.extraActivities;
        const existExtraActivities = extraActivities.filter(a => { return a.name !== name });

        existExtraActivities.push({ name, year, description });
        user.additionalInformation.extraActivities = existExtraActivities;
        user.save();

        res.status(200).json({ extraActivities: user.additionalInformation.extraActivities });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//Method: DELETE
//Endpoint: "/extra-activities"
//Description: Update the profile with additional information about undergraduate
module.exports.deleteExtraActivities = catchAsync(async (req, res) => {
    try {
        const userId = req.body.id;
        // const userId = res.locals.user.id;
        const { name } = req.body;

        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(400).json({ error: "user not found" });
        }

        const extraActivities = user.additionalInformation.extraActivities;
        const extraActivitiesIndex = extraActivities.findIndex((a) => { return a.name === name });
        if (extraActivitiesIndex === -1) {
            return res.status(400).json({ error: "extra activity not found" });
        }

        extraActivities.splice(extraActivitiesIndex, 1);
        user.additionalInformation.extraActivities = extraActivities;
        user.save();

        res.status(200).json({ extraActivities: user.additionalInformation.extraActivities });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//Method: POST
//Endpoint: "/projects"
//Description: Update the profile with additional information about undergraduate
module.exports.addProject = catchAsync(async (req, res) => {
    try {
        const userId = req.body.id;
        // const userId = res.locals.user.id;
        const { name, year, description, languages, links } = req.body;

        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(400).json({ error: "user not found" });
        }

        const projects = user.additionalInformation.projects;
        const existProjects = projects.filter(a => { return a.name !== name });

        existProjects.push({ name, year, description, languages, links });
        user.additionalInformation.projects = existProjects;
        user.save();

        res.status(200).json({ projects: user.additionalInformation.projects });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//Method: DELETE
//Endpoint: "/projects"
//Description: Update the profile with additional information about undergraduate
module.exports.deleteProject = catchAsync(async (req, res) => {
    try {
        const userId = req.body.id;
        // const userId = res.locals.user.id;
        const { name } = req.body;

        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(400).json({ error: "user not found" });
        }

        const projects = user.additionalInformation.projects;
        const projectsIndex = projects.findIndex((a) => { return a.name === name });
        if (projectsIndex === -1) {
            return res.status(400).json({ error: "project not found" });
        }

        projects.splice(projectsIndex, 1);
        user.additionalInformation.projects = projects;
        user.save();

        res.status(200).json({ projects: user.additionalInformation.projects });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//Method: POST
//Endpoint: "/english-skill"
//Description: Update the profile with additional information about undergraduate
module.exports.addEnglishSkill = catchAsync(async (req, res) => {
    try {
        const userId = req.body.id;
        // const userId = res.locals.user.id;
        const { odinaryLevel, advancedLevel, level01, level02, courses } = req.body;

        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(400).json({ error: "user not found" });
        }

        user.additionalInformation.englishSkill = {
            odinaryLevel,
            advancedLevel,
            level01,
            level02,
            courses
        };

        user.save();

        res.status(200).json({ englishSkill: user.additionalInformation.englishSkill });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


//Method: GET
//Endpoint: "/additional-information"
//Description: Update the profile with additional information about undergraduate
module.exports.getAdditionalInformation = catchAsync(async (req, res) => {
    try {
        const userId = req.body.id;
        // const userId = res.locals.user.id;

        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(400).json({ error: "user not found" });
        }

        res.status(200).json({ additionalInformation: user.additionalInformation });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
