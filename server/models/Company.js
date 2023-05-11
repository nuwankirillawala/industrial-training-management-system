const mongoose = require('mongoose');
const { isEmail } = require('validator');
const Undergraduate = require('./Undergraduate');
const Supervisor = require('./Supervisor');

const companySchema = new mongoose.Schema({
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
    address: {
        type: String
    },
    connectedForIntern:{
        type: Boolean
        // default: true
    },
    internSeats: {
        type: String
    },
    description: {
        type: String
    },
    contactPerson: [{
        contactPersonName: {
            type: String,
        },
        contactPersonContactNo: {
            type: String
        },
        contactPersonEmail: {
            type: String,
            lowercase: true,
            validate: [isEmail, 'Please enter a valid email']
        },
        contactPersonPosition: {
            type: String
        }
    }],
    rating: [{
        criteria01:{
            type: String
        }
    }],
    internApplications:{
        applicationListSize: {
            type: Number,
            default: 10
        },
        applicationList: [{
            candidate: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Undergraduate'
            }
        }],
        recommendations: [{
            candidate: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Undergraduate'
            }
        }],
        applicationStatus: {
            type: String,
            enum: ['saved', 'sent']
        }
    },
    supervisors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Supervisor
    }],
    interns: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Undergraduate'
    }]
});

//confirm the creation
companySchema.post('save', function(doc, next){
    console.log(`New Company: ${doc.name} was created`, doc);
    next();
});

const Company = mongoose.model('company', companySchema);

module.exports = Company;