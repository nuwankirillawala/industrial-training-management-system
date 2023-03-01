const Undergraduate = require('../models/Undergraduate');
const Company = require('../models/Company');
const handleErrors = require('../utils/appErrors');
const { default: mongoose } = require('mongoose');

// Method: GET
//Endpoint: "/view-undergraduate-profile"
// Function: View Undegraduate Profile
module.exports.viewUndergraduateProfile = async (req, res) => {
    try {
        const userId = req.body.id; // 🛑 user id must get from jwt in future 🛑
        const user = await Undergraduate.findById(userId);

        if (!user) {
            res.status(400).json({ message: "User not found!" })
        }
        res.status(200).json({ user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err })
    }
}

// Method = PATCH
// Endpoint = "/update-undergraduate-profile"
// Function = Update undergraduate profile
module.exports.updateUndergraduateProfile = async (req, res) => {
    try {
        const userId = req.body.id; // 🛑 user id must get from jwt in future 🛑
        const { email, contactNo, linkdinURL, githubURL, internStatus } = req.body;

        const filter = { _id: userId };
        const update = { $set: { email, contactNo, linkdinURL, githubURL, internStatus } };
        const options = { new: true };

        await Undergraduate.updateOne(filter, update, options)
            .then(async () => {
                const user = await Undergraduate.findOne(filter);
                if (!user) {
                    res.status(200).json({ message: "user not exists" });
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

// Method = PATCH
// Endpoint = "/company-selection"
// Function = Select companies for internship
module.exports.companySelection = async (req, res) => {
    try {
        const userId = req.body.id; // 🛑 user id must get from jwt in future 🛑
        const { companySelection01, companySelection02, companySelection03 } = req.body;

        // if selection is '' / empty then return an error
        if (companySelection01 === '' || companySelection02 === '' || companySelection03 === '') {
            res.status(400).json({ message: "Error! null field in the input" });
        }

        const updatedUser = await Undergraduate.findByIdAndUpdate(userId, { companySelection01, companySelection02, companySelection03 }, { new: true });
        console.log(updatedUser);
        res.status(200).json({ message: "Company Selection Completed" });
    } catch (err) {
        res.status(500).json(err);
    }
}

// Method = GET
// Endpoint = "/undergraduate-dashboard"
// Function = Undergraduate Dashboard
module.exports.undergraduateDashboard = async (req, res) => {
    try {
        const userId = req.body.id // 🛑 user id must get from jwt in future 🛑
        // get all data exept password
        const user = await Undergraduate.findById(userId).select('-password');
        if(!user){
            res.status(404).json({message: "user not found!"});
        }

        const companies = await Company.find();
        res.status(200).json({user, companies});
    } catch (err) {
        res.status(500).json({message: "server error!"});
    }
}