const mongoose = require('mongoose');
const { isEmail } = require('validator');

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
        type: Boolean,
        default: true
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
    }]
});

//confirm the creation
companySchema.post('save', function(doc, next){
    console.log(`New Company: ${doc.name} was created`, doc);
    next();
});

const Company = mongoose.model('company', companySchema);

module.exports = Company;