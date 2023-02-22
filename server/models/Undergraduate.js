const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const undergraduateSchema = new mongoose.Schema({
    role: {
        type: String,
        default: 'undergraduate'
    },
    name: {
        type: String,
        required: [true, 'Please enter the name']
    },
    regNo: {
        type: String,
        required: [true, 'Please enter the student registration number'],
        unique: true

    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter valid email']
    },
    contactNo: {
        type: String
    },
    password: {
        type: String,
        require: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6']
    },
    linkdinURL:{
        type: String
    },
    githubURL:{
        type: String
    },
    gpa:{
        type: String
    },
    weightedGPA:{
        type: String
    },
    internStatus:{
        type: String
    },
    cvURL:{
        type: String
    }
});

// encrypt user password
undergraduateSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// confirm user creation
undergraduateSchema.post('save', function (doc, next) {
    console.log(`New Undergraduate ${doc.name} was created`, doc);
    next();
});

undergraduateSchema.statics.login = async function (email, password) {
    const undergraduate = await this.findOne({ email });
    if (undergraduate) {
        const auth = await bcrypt.compare(password, undergraduate.password);
        if (auth) {
            return undergraduate;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

const Undergraduate = mongoose.model('undergraduate', undergraduateSchema);

module.exports = Undergraduate;
