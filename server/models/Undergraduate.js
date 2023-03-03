const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');
const Result = require('./Result');
const Company = require('./Company');


const noteSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
        required: [true, 'Note content is empty!']
    }
});

const internStatusSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Company
    },
    status: {
        type: String
    }
});


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
    notes: [noteSchema],
    gpa:{
        type: String
    },
    weightedGPA:{
        type: String
    },
    cvURL:{
        type: String
    },
    results: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Result
    },
    companySelection01: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Company
    },
    companySelection02: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Company
    },
    companySelection03: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Company
    }, 
    //for update the status of intern application process
    // about companies that sent cv by department
    internStatus:[{
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Company
        },
        status: {
            type: String
        }
    }],
    // upadate if you select for internship outside
    externalInternStatus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Company 
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
