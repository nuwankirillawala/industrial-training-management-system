const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const Result = require('./Result');
const Company = require('./Company');
const Supervisor = require('./Supervisor');


const noteSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
        required: [true, 'Note content is empty!']
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
    profileImage: {
        type: String
    },
    linkdinURL: {
        type: String
    },
    githubURL: {
        type: String
    },
    notes: [noteSchema],
    gpa: {
        type: String
    },
    weightedGPA: {
        type: String
    },
    cvURL: {
        type: String
    },
    results: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Result
    },
    additionalInformation: {
        softSkills: [{
            type: String
        }],
        technologies: [{
            name: { type: String },
            level: { type: String }
        }],
        certifications: [{
            name: { type: String },
            issuedBy: { type: String }
        }],
        extraActivities: [{
            name: { type: String },
            year: { type: String },
            description: { type: String }
        }],
        projects: [{
            name: { type: String },
            year: { type: String },
            languages: { type: String },
            description: { type: String },
            links: {
                design: { type: String },
                github: { type: String },
                hosted: { type: String },
            },
        }],
        englishSkill: {
            odinaryLevel: { type: String },
            advancedLevel: { type: String },
            level01: { type: String },
            level02: { type: String },
            courses: [{
                name: { type: String },
                offeredBy: { type: String },
                grade: { type: String }
            }],
        },
    },
    companySelection: {
        choice01: {
            companyId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: Company
            },
            jobRole: {
                type: String
            }
        },
        choice02: {
            companyId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: Company
            },
            jobRole: {
                type: String
            }
        },
        choice03: {
            companyId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: Company
            },
            jobRole: {
                type: String
            }
        },
        choice04: {
            companyId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: Company
            },
            jobRole: {
                type: String
            }
        },
        choice05: {
            companyId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: Company
            },
            jobRole: {
                type: String
            }
        },
    },
    //for update the status of intern application process
    // about companies that sent cv by department
    internStatus: [{
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Company
        },
        jobRole: {
            type: String
        },
        status: {
            type: String,
            enum: ['cv-sent', 'called', 'selected', 'not-selected']
        }
    }],
    // update if undergaduate select for internship
    internship: {
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Company
        },
        jobRole: {
            type: String
        },
        type: {
            type: String,
            enum: ['internal', 'external']
        },
        internshipStart: {
            type: Date
        },
        internshipEnd: {
            type: Date
        }
    },
    supervisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Supervisor
    },
    weeklyReports: [{
        weekNumber: {
            type: Number,
            required: true
        },
        weekStartDate: {
            type: Date
        },
        weekEndDate: {
            type: Date
        },
        dailyReports: [{
            dayNumber: {
                type: Number,
                required: true
            },
            date: {
                type: Date,
                required: true
            },
            content: {
                type: String
            },
            approvalStatus: {
                type: String,
                default: 'empty',
                enum: ['approved', 'rejected', 'pending', 'edited', 'empty']
            }
        }],
        problemSection: {
            type: String
        },
        reportStatus: {
            type: String,
            default: 'empty',
            enum: ['empty', 'saved', 'submitted']
        },
        reportPDF: {
            type: String
        }
    }],
    monthlyReports: [{
        monthNumber: {
            type: Number,
            required: true
        },
        monthEndDate: {
            type: Date
        },
        weekEndDate: {
            type: Date
        },
        weeklyReports: [{
            weekNumber: {
                type: Number,
                required: true
            },
            weekStartDate: {
                type: Date
            },
            weekEndDate: {
                type: Date
            },
            content: {
                type: String
            },
            approvalStatus: {
                type: String,
                default: 'empty',
                enum: ['approved', 'rejected', 'pending', 'edited', 'empty']
            }
        }],
        problemSection: {
            type: String
        },
        leaveRecord: {
            absentDays: {
                type: Number
            },
            approvalStatus: {
                type: String,
                enum: ['approved', 'not-approved', 'pending', 'empty']
            }
        },
        reportStatus: {
            type: String,
            default: 'empty',
            enum: ['empty', 'saved', 'submitted']
        },
        reportPDF: {
            type: String
        }
    }],
    progressReport: {
        nameOfEstablishment: {
            type: String
        },
        trainingPeriod: {
            startDate: {
                type: Date
            },
            endDate: {
                type: Date
            }
        },
        comments: {
            conduct: {
                type: String
            },
            attitude: {
                type: String
            },
            attendance: {
                type: String
            }
        },
        leaves: {
            total: {
                type: Number
            },
            authorized: {
                type: Number
            },
            unauthorized: {
                type: Number
            }
        },
        signatureOfSupervisor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Supervisor
        },
        reportPDF: {
            type: String
        }
    },
    finalFeedback: {
        rating: {
            attendanceAndPunctuality: {
                type: Number,
                enum: [1, 2, 3, 4]
            },
            communicationSkills: {
                type: Number,
                enum: [1, 2, 3, 4]
            },
            practicalApplication: {
                type: Number,
                enum: [1, 2, 3, 4]
            },
            problemSolvingSkills: {
                type: Number,
                enum: [1, 2, 3, 4]
            },
            multiPerspectiveView: {
                type: Number,
                enum: [1, 2, 3, 4]
            },
            teamWork: {
                type: Number,
                enum: [1, 2, 3, 4]
            },
            leadership: {
                type: Number,
                enum: [1, 2, 3, 4]
            },
            attitudeAndBehavior: {
                type: Number,
                enum: [1, 2, 3, 4]
            },
            ethicalBehavior: {
                type: Number,
                enum: [1, 2, 3, 4]
            },
            overallPerformance: {
                type: Number,
                enum: [1, 2, 3, 4]
            },
        },
        feedback:{
            type: String
        }
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


const Undergraduate = mongoose.model('undergraduate', undergraduateSchema);

module.exports = Undergraduate;
