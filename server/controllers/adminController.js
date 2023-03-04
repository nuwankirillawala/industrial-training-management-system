const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Undergraduate = require('../models/Undergraduate');
const Alumni = require('../models/Alumni');
const Supervisor = require('../models/Supervisor');
const Company = require('../models/Company');
const Result = require('../models/Result');
const handleErrors = require('../utils/appErrors');
const { default: mongoose } = require('mongoose');
const xlsx = require('xlsx');
const path = require('path');
const multer = require('multer');
const searchUsers = require('../utils/searchUsers');
const setCreditValue = require('../utils/setCreditValue');
const gradeValue = require('../utils/gradeValue');

// Method = POST
// Endpoint = "/create-admin"
// Function = create admin-user
module.exports.createAdmin = async (req, res) => {
    try {
        const { role, name, email, contactNo, staffId, password } = req.body;
        const user = await Admin.create({ role, name, email, contactNo, staffId, password });

        if(!user){
            return res.status(400).json({message: "error! can't create the user!"});
        }

        res.status(201).json({
            user: user._id,
            type: user.role,
            message: `${user.role} created successfullly`
        });
    } catch (err) {
        const errors = handleErrors(err);
        console.log({ errors });
        res.status(500).json({ errors });
    }
}

// Method = GET
// Endpoint = "/view-all-users/:userType"
// Function = View all users by user type
module.exports.viewAllUsers = async (req, res) => {
    try {
        const userType = req.params.userType;
        let users = [];

        if (userType === "admin") {
            users = await Admin.find();
        }
        else if (userType === "undergraduate") {
            users = await Undergraduate.find();
        }
        else if (userType === "supervisor") {
            users = await Supervisor.find();
        }
        else if (userType === "alumni") {
            users = await Alumni.find();
        }

        console.log(users);
        res.status(200).json({ users });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
}

// Method = GET
// Endpoint = "/search-users/:userType"
// Function = search user by name, regno, email
module.exports.searchUsers = async (req, res) => {
    try {
        const userType = req.params.userType;
        const searchTerm = req.query.q;
        const searchBy = req.query.searchBy;

        let users = await searchUsers(searchBy, userType, searchTerm);

        res.status(200).json(users);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

// Method = GET
// Endpoint = "/admin profile"
// Function = view admin profile
module.exports.adminProfile = async (req, res) => {
    try {
        const userId = req.body.id;
        const user = await Admin.findById(userId);

        if (!user) {
            return res.status(404).json({ "error": "User not found!" })
        }
        res.status(200).json({ user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err })
    }
}

// Method = PATCH
// Endpoint = "/update-admin-profile"
// Function = Update admin profile
module.exports.updateAdminProfile = async (req, res) => {
    try {
        const userId = req.body.id;
        const { role, name, email, contactNo, staffId } = req.body;

        const filter = { _id: userId };
        const update = { $set: { role, name, email, contactNo, staffId } };
        const options = { new: true };

        // findbyIdAndUpdate mongoose⚡

        await Admin.updateOne(filter, update, options)
            .then(async () => {
                const user = await Admin.findOne(filter);
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
}


//Method: POST
//Endpoint: "/add-result"
//Function: Add results of undergraduate

module.exports.addResult = async (req, res) => {
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
};

//Method: PATCH
//Endpoint: "/set-weigted-gpa"
//Function: Set wiighted gpa for undergraduate
module.exports.setWeightedGPA = async (req, res) => {
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
}

//Method: GET
//Endpoint: "/assign-supervisor"
//Function: Send companies and supervisors for assign-supervisor form
module.exports.assignSupervisorGET = async (req, res) => {
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
}

//Method: PATCH
//Endpoint: "/assign-supervisor"
//Function: Assign a supervisor for undergraduate
module.exports.assignSupervisorPATCH = async (req, res) => {
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
}

//Method: GET
//Endpoint: "/intern-process-company-list"
//Function: View companies that select for intern application process
module.exports.internProcessCompanyList = async (req, res) => {
    try {
        const companyList = await Company.find({ connectedForIntern: false });

        if (companyList.length === 0) {
            return res.status(404).json({ message: "No any company for intern process" });
        }

        res.status(200).json(companyList);
    } catch (err) {
        res.status(500).json(err);
    }
}



