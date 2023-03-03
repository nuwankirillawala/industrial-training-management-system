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
// Endpoint = "/create-user/:userType"
// Function = create users - all types

module.exports.createUser = async (req, res) => {
    const userType = req.params.userType;
    if (userType === 'admin') {
        const { role, name, email, contactNo, staffId, password } = req.body;

        try {
            const user = await Admin.create({ role, name, email, contactNo, staffId, password });
            res.status(201).json({ messadmin: user._id });

        } catch (err) {
            const errors = handleErrors(err);
            console.log({ errors });
            res.status(400).json({ errors });
        }
    }
    else if (userType === 'undergraduate') {
        const { name, regNo, email, contactNo, password, gpa } = req.body;

        try {
            const user = await Undergraduate.create({ name, regNo, email, contactNo, password, gpa });
            res.status(201).json({ 
                user: user._id,
                type: user.role,
                message: "user created successfullly"
             });
        } catch (err) {
            const errors = handleErrors(err);
            console.log({ errors });
            res.status(400).json({ errors });
        }
    }
    else if (userType === 'supervisor') {
        const { name, email, contactNo, company, jobRole, password } = req.body;

        try {
            const user = await Supervisor.create({ name, email, contactNo, company, jobRole, password });
            res.status(201).json({ 
                user: user._id,
                type: user.role,
                message: "user created successfullly"
             });
        } catch (err) {
            const errors = handleErrors(err);
            console.log({ errors });
            res.status(400).json({ errors });
        }
    }
    else if (userType === 'alumni') {
        const { name, email, contactNo, regNo, graduatedYear, password } = req.body;

        try {
            const user = await Alumni.create({ name, email, contactNo, regNo, graduatedYear, password });
            res.status(201).json({ 
                user: user._id,
                type: user.role,
                message: "user created successfullly"
             });
        } catch (err) {
            const errors = handleErrors(err);
            console.log({ errors });
            res.status(400).json({ errors });
        }
    }
    else {
        console.log('invalid user type');
        res.status(400).json({ error: 'invalid user type' });
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



// Method = POST
// Endpoint = "/create-company"
// Function = create a company
module.exports.createCompany = async (req, res) => {
    try {
        const { name, email, contactNo, address, internSeats, description } = req.body;
        //const {criteria01} = req.body.rating;
        const company = await Company.create({ name, email, contactNo, address, internSeats, description });
        res.status(201).json({ company: company._id });
    } catch (err) {
        const errors = handleErrors(err);
        console.log(errors);
        res.status(400).json({ errors });
    }
}

// Method = POST
// Endpoint = "//:companyID/add-contact-person"
// Function = add a contact person for a company
module.exports.addContactPerson = async (req, res) => {
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
}

// Method = PATCH
// Endpoint = "/:companyID/edit-rating"
// Function = edit company ratings
module.exports.editCompanyRating = (req, res) => {
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
            .filter(({gpv}) => gpv !== null);

            const totalCredits = results.reduce((sum, {creditValue}) => sum + creditValue, 0);
            console.log(totalCredits);
            const gpvByCredit = results.reduce((sum, { creditValue, gpv }) => sum + creditValue * gpv, 0);
            const weightedGPA = gpvByCredit / totalCredits;

            console.log(weightedGPA);
            await Undergraduate.findByIdAndUpdate(user._id, { weightedGPA});
        }
        res.status(200).json({message: 'GPA calculation completed'});
    } catch (err) {
        console.log(err);
        console.log(err);
        res.status(500).json({message: 'An error occurred while calculating GPAs.'});
    }
}

//Method: PATCH
//Endpoint: "/add-supervisor"
//Function: Add supervisor for undergraduate
// module.exports.assignSupervisor
