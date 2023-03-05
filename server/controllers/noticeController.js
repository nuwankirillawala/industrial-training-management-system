const Admin = require("../models/Admin");
const Notice = require("../models/Notice");
const catchAsync = require("../utils/catchAsync");

// Method: POST
// Endpoint: "/create-notice"
// Description: Create a notice
module.exports.createNotice = catchAsync(async (req, res) => {
    try {
        const userId = req.body.id; // 🛑 user id must get from jwt in future 🛑
        const user = await Admin.findById(userId);

        if (!user) {
            return res.status(400).json({ message: "user not found!" });
        }

        const {title, body} = req.body;

        // create a notice
        const notice = await Notice.create({title, body, author:userId});

        // push creation into edit log
        notice.editLog.push({status: 'created', title, body, author:userId, editDate:notice.publishedDate});
        notice.save();

        res.status(201).json({message: "new notice is created successfully", notice});
    } catch (err) {
        console.log(err.message);
        res.status(500).json(err);
    }
});

// Method: PUT
// Endpoint: "/edit-notice"
// Description: Edit a notice
// module.exports.createNotice = catchAsync(async (req, res) => {
//     try {
//         const userId = req.body.id; // 🛑 user id must get from jwt in future 🛑
//         const user = await Admin.findById(userId);

//         if (!user) {
//             return res.status(400).json({ message: "user not found!" });
//         }

//         const {noticeId, title, body} = req.body;

//         const notice = await  

//         const date = Date();

//         const notice = await Notice.create({title, body, author:userId, publishedDate:date});
//         res.status(201).json({message: "new notice is created successfully", notice})
//     } catch (err) {
//         console.log(err.message);
//         res.status(500).json(err);
//     }
// });