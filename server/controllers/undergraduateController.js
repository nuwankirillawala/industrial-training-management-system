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
            res.status(400).json({ message: "user not found!" })
        }
        else {
            res.status(200).json({ user });
        }
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
                    res.status(200).json({ message: "user not found!" });
                }
                else {
                    res.status(200).json(user);
                }
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
        const { priority, companyId, jobRole } = req.body;

        // check user is exist
        const user = await Undergraduate.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "user not found!" });
        }

        // check company is exist
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: "company not found" });
        }

        // check that user already apply for that company
        const existCompany = user.companySelection.filter((selection) => {
            return selection.companyId.equals(companyId);
        });
        if(existCompany){
            return res.status(400).json({message: "user already apply for that company"});
        }

        // check that user already add a company for that priority
        const existPriority = user.companySelection.filter((selection) => {
            return selection.priority.equals(priority);
        });

        if(existPriority){
            return res.status(400).json({message: "priority already exists"});
        };

        const newCompanySelection = {priority, companyId, jobRole};
        const updatedUser = await Undergraduate.findByIdAndUpdate(
            userId,
            {$push: {companySelection: newCompanySelection}},
            {new: true}
        );

        if (updatedUser) {
            res.status(200).json(updatedUser.companySelection);
        }
        else {
            res.status(400).json("error");
        }
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
}

// Method = PATCH
// Endpoint = "/add-note"
// Function = Add a note
module.exports.addNote = async (req, res) => {
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
}

// Method = GET
// Endpoint = "/view-notes"
// Function = View notes
module.exports.viewNotes = async (req, res) => {
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

}

// Method: GET
// Endpoint = "/view-note"
// Function = View a note
module.exports.viewNote = async (req, res) => {
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

}


// Method = GET
// Endpoint = "/edit-note"
// Function = Edit a note
module.exports.editNote = async (req, res) => {
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

}

// 🛑 This is a tempory route controller. just for checking 🛑
// Method = PATCH
// Endpoint = "/add-intern-status"
// Function = add intern status
module.exports.addInternStatus = async (req, res) => {
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
}

// Method = PATCH
// Endpoint = "/edit-intern-status"
// Function = Edit intern status
module.exports.editInternStatus = async (req, res) => {
    try {
        const userId = req.body.id // 🛑 user id must get from jwt in future 🛑
        const { companyId, newStatus } = req.body;
        // console.log(companyId, newStatus);
        const user = await Undergraduate.findById(userId);
        // console.log(user);
        if (!user) {
            res.status(404).json({ message: "user not found!" });
        }
        else {
            const company = await Company.findById(companyId);
            if (!company) {
                res.status(404).json({ message: "company not found" });
            }
            else {
                // console.log(user.internStatus);
                const existingInternStatus = user.internStatus.filter((status) => { return status.company.equals(companyId) });
                console.log(existingInternStatus);
                if (!existingInternStatus) {
                    res.status(400).json({ message: "Error! User hasn't listed on that company" });
                } else {
                    // const newInternSatatus = {status: newStatus };
                    const updatedUser = await Undergraduate.findOneAndUpdate(
                        { _id: userId, "internStatus._id": existingInternStatus[0]._id },
                        { $set: { "internStatus.$.status": newStatus } },
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
}

