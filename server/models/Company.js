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
    connectedForIntern: {
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
    ratings: {
        culture: { type: Number },
        work_life_balance: { type: Number },
        oppertunities_to_growth: { type: Number },
        salary_and_benifits: { type: Number },
        location: { type: Number },
        projects: { type: Number },
        mentorship: { type: Number },
        reputation: { type: Number },
        industry: { type: Number },
        technology: { type: Number },
        team_size: { type: Number },
        values: { type: Number },
        mission: { type: Number },
        support: { type: Number },
        experience: { type: Number },
        total: { type: Number },

    },
    adminRatings: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admin'
        },
        ratings: {
            culture: { type: Number },
            work_life_balance: { type: Number },
            oppertunities_to_growth: { type: Number },
            salary_and_benifits: { type: Number },
            location: { type: Number },
            projects: { type: Number },
            mentorship: { type: Number },
            reputation: { type: Number },
            industry: { type: Number },
            technology: { type: Number },
            team_size: { type: Number },
            values: { type: Number },
            mission: { type: Number },
            support: { type: Number },
            experience: { type: Number },
            total: { type: Number },
        }
    }],
    alumniRatings: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Alumni'
        },
        ratings: {
            culture: { type: Number },
            work_life_balance: { type: Number },
            oppertunities_to_growth: { type: Number },
            salary_and_benifits: { type: Number },
            location: { type: Number },
            projects: { type: Number },
            mentorship: { type: Number },
            reputation: { type: Number },
            industry: { type: Number },
            technology: { type: Number },
            team_size: { type: Number },
            values: { type: Number },
            mission: { type: Number },
            support: { type: Number },
            experience: { type: Number },
            total: { type: Number },
        }
    }],
    internApplications: {
        applicationListSize: {
            type: Number,
            default: 10
        },
        applicationList: [{
            candidate: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Undergraduate"
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


// Calculate average ratings for each criteria and update the ratings document
companySchema.methods.calculateAverageRatings = function () {
    const { adminRatings, alumniRatings } = this;
  
    // Calculate average ratings for admin and alumni separately
    const calculateAverage = (ratingsArray) => {
      const criteriaCount = Object.keys(ratingsArray[0].ratings).length;
      const averageRatings = {};
  
      for (let i = 0; i < criteriaCount; i++) {
        const criteria = Object.keys(ratingsArray[0].ratings)[i];
        let total = 0;
        let count = 0;
  
        for (let j = 0; j < ratingsArray.length; j++) {
          total += ratingsArray[j].ratings[criteria] || 0;
          count++;
        }
  
        averageRatings[criteria] = total / count;
      }
  
      return averageRatings;
    };
  
    const adminAverageRatings = adminRatings.length ? calculateAverage(adminRatings) : {};
    const alumniAverageRatings = alumniRatings.length ? calculateAverage(alumniRatings) : {};
  
    // Calculate the overall average ratings
    const criteriaCount = Object.keys(adminAverageRatings).length;
    const totalRatings = {};
  
    for (let i = 0; i < criteriaCount; i++) {
      const criteria = Object.keys(adminAverageRatings)[i];
      const adminRating = adminAverageRatings[criteria] || 0;
      const alumniRating = alumniAverageRatings[criteria] || 0;
      const averageRating = (adminRating * 2 + alumniRating) / 3;
  
      totalRatings[criteria] = averageRating;
    }
  
    // Update the ratings document
    this.ratings = totalRatings;
    this.markModified('ratings'); // Mark the field as modified to trigger save properly
  };
  

//confirm the creation
companySchema.post('save', function (doc, next) {
    console.log(`New Company: ${doc.name} was created`, doc);
    next();
});

const Company = mongoose.model('company', companySchema);

module.exports = Company;