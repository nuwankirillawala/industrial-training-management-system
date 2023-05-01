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

        const { title, body } = req.body;

        // create a notice
        const notice = await Notice.create({ title, body, author: userId });

        // push creation into edit log
        notice.editLog.push(
            {
                status: 'created',
                title,
                body,
                author: userId,
                editDate: notice.publishedDate
            });
        notice.save();

        res.status(201).json({ message: "new notice is created successfully", notice });
    } catch (err) {
        console.log(err.message);
        res.status(500).json(err);
    }
});

// Method: PATCH
// Endpoint: "/edit-notice"
// Description: Edit a notice
module.exports.editNotice = catchAsync(async (req, res) => {
    try {
        const userId = req.body.id; // 🛑 user id must get from jwt in future 🛑
        const user = await Admin.findById(userId);

        if (!user) {
            return res.status(400).json({ message: "user not found!" });
        }

        const { noticeId, title, body } = req.body;

        const notice = await Notice.findById(noticeId);
        if (!notice) {
            return res.status(400).json({ message: "notice not found!" });
        }

        // edit the notice
        const newNotice = await Notice.findOneAndUpdate(
            { _id: noticeId },
            {
                $set: {
                    title,
                    body,
                    author: userId,
                    publishedDate: Date.now()
                }
            },
            { new: true }
        );
        
        // push edit into edit log
        newNotice.editLog.push(
            { 
                status: 'edited', 
                title, 
                body, 
                author: userId, 
                editDate: newNotice.publishedDate 
            });
        newNotice.save();

        res.status(200).json({ message: "notice update successfully", newNotice });
    } catch (err) {
        console.log(err.message);
        res.status(500).json(err);
    }
});

// Method: GET
// Endpoint: "/view-all-notices"
// Description: View all notices
module.exports.viewAllNotices = catchAsync(async (req, res) => {
    try {
        const notices = await Notice.find();
        if (!notices) {
            return res.status(400).json({ message: "notices not found!" });
        }

        res.status(200).json({
            status: "success",
            results: notices.length,
            data: notices
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json(err);
    }
});
 

// Method: GET
// Endpoint: "/view-notice"
// Description: View a notice
module.exports.viewNotice = catchAsync(async (req, res) => {
    try {
        const noticeId = req.body.noticeId;
        const notice = await Notice.findById(noticeId);
        if (!notice) {
            return res.status(400).json({ message: "notice not found!" });
        }

        res.status(200).json(notice);
    } catch (err) {
        console.log(err.message);
        res.status(500).json(err);
    }
});

// Method: DELETE
// Endpoint: "/delete-notice"
// Description: Delete a notice
module.exports.deleteNotice = catchAsync(async (req, res) => {
    try {
        const noticeId = req.body.noticeId;
        const notice = await Notice.findByIdAndDelete(noticeId);
        if (!notice) {
            return res.status(400).json({ message: "notice not found!" });
        }

        res.status(200).json({message: "notice deleted successfully", notice});
    } catch (err) {
        console.log(err.message);
        res.status(500).json(err);
    }
});