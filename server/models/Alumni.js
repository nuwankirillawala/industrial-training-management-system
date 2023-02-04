const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const alumniSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter the name']
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        lowercase: true,
        validate: [isEmail, 'Please enter valid email']
    },
    contactNo: {
        type: String
    },
    regNo: {
        type: String,
        required: [true, 'Please enter the student registration number'];

    },
    password: {
        type: String,
        require: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6']
    }
});

// encrypt user password
alumniSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// confirm user creation
alumniSchema.post('save', function (doc, next) {
    console.log(`New Alumni member ${doc.name} was created`, doc);
    next();
});

alumniSchema.statics.login = async function (email, password) {
    const alumni = await this.findOne({ email });
    if (alumni) {
        const auth = await bcrypt.compare(password, alumni.password);
        if (auth) {
            return alumni;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

const Alumni = mongoose.model('alumni', alumniSchema);

module.exports = Alumni;
