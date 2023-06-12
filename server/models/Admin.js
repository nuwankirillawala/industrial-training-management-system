const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
    role: {
        type: String,
        required: [true, 'Please select or enter the admin role'],
        enum: ["system-admin", "department-coordinator"]
    },
    name: {
        type: String,
        required: [true, 'Please enter the name']
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    contactNo: {
        type: String
    },
    staffId: {
        type: String
    },
    password: {
        type: String,
        require: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6']
    },
    profileImage: {
        type: String
    },
    verificationToken: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    }
});

// fire hashing function before storing in database
adminSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// fire confirmation function after storing
adminSchema.post('save', function (doc, next) {
    console.log(`New ${doc.adminRole}: ${doc.name} was created`, doc);
    next();
});

const Admin = mongoose.model('admin', adminSchema);

module.exports = Admin;
