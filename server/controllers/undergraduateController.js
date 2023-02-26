const Undergraduate = require('../models/Undergraduate');
const Company = require('../models/Company');
const handleErrors = require('../utils/appErrors');
const { default: mongoose } = require('mongoose');

// Method: GET
//Endpoint: "/view-undergraduate-profile"
// Function: View Undegraduate Profile
module.exports.viewUndergraduateProfile = async (req, res) => {
    try {
        const userId = req.body.id;
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
        const userId = req.body.id;
        const {email, contactNo, linkdinURL, githubURL, internStatus } = req.body;

        const filter = { _id: userId};
        const update = {$set: {email, contactNo, linkdinURL, githubURL, internStatus }};
        const options = {new : true};

        await Undergraduate.updateOne(filter, update, options)
        .then(async ()=> {
            const user = await Undergraduate.findOne(filter);
            if(!user){
                res.status(200).json({message: "user not exists"});
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