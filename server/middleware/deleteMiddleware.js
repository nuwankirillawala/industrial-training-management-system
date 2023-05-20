const multer = require('multer');
const fs = require('fs');
const Admin = require('../models/Admin');
const Undergraduate = require('../models/Undergraduate');
const Supervisor = require('../models/Supervisor');
const Alumni = require('../models/Alumni');

// Middleware function to delete existing image file
const deleteExistingImage = async (req, res, next) => {
    const user = req.user;
    let currentUser;

    if (user.role === 'system-admin' || user.role == 'department-coordinater') {
        currentUser = await Admin.findById(user.id).select('profileImage');
    }
    else if (user.role === 'undergraduate') {
        currentUser = await Undergraduate.findById(user.id).select('profileImage');
    }
    else if (user.role === 'supervisor') {
        currentUser = await Supervisor.findById(user.id).select('profileImage');
    }
    else if (user.role === 'alumni') {
        currentUser = await Alumni.findById(user.id).select('profileImage');
    }

    const existingImagePath = currentUser.profileImage;

    if (existingImagePath) {
        // Delete the existing image file
        fs.unlink(existingImagePath, err => {
            if (err) {
                console.error('Error deleting existing image:', err);
            }
            console.log('Existing image deleted');
            next();
        });
    } else {
        next();
    }
};

module.exports = { deleteExistingImage };