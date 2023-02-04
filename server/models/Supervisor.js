const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const supervisorSchema = new mongoose.Schema({
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
    company: {
        type: String,
        required: [true, 'Please enter the company']
    },
    jobRole:{
        type: String
    },
    password: {
        type: String,
        require: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6']
    }
});

// encrypt user password
supervisorSchema.pre('save', async function (next) {
    const salt = bcrypt.genSalt();
    this.password = bcrypt.hash(this.password, salt);
    next();
});

// confirm user creation
supervisorSchema.post('save', function (doc, next) {
    console.log(`Supervisor: ${doc.name} was created`);
});

supervisorSchema.statics.login = async function(email, password){
    const supervisor = await this.findOne({email});
    if(supervisor){
        const auth = await bcrypt.compare(password, supervisor.password);
        if(auth){
            return supervisor;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

const Supervisor = mongoose.model('supervisor', supervisorSchema);

module.exports = Supervisor;
