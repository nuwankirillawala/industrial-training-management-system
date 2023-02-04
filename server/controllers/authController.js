const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Undergraduate = require('../models/Undergraduate');
const Alumni = require('../models/Alumni');
const Supervisor = require('../models/Supervisor');


// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '', name: '', adminRole: '' };

    //handle login errors
    //incorrect email
    if (err.message === 'incorrect email') {
        errors.email = "That email is not regitered";
    }

    //incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'This password is incorrect';
    }

    return errors;
}

const maxAge = 12 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'project itms', {
        expiresIn: maxAge
    });
}

module.exports.login_get = (req, res) => {
    res.send('--Login Form--');
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    console.log('login controller');

    try {
        let user, userID, userType;
        try {
            user = await Admin.login(email, password);
            userID = user._id;
            userType = "admin";
        } catch (err) {
            try {
                user = await Undergraduate.login(email, password);
                userID = user._id
                userType = "undergraduate";
            } catch (err) {
                try {
                    user = await Supervisor.login(email, password);
                    userID = user._id
                    userType = "supervisor";
                } catch (err) {
                    try {
                        user = await Alumni.login(email, password);
                        userID = user._id
                        userType = "alumni";
                    } catch (err) {
                        throw new Error('incorrect email or password');
                    }
                }
            }
        }
        const token = createToken(userID);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ [userType]: userID });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/login');
}

module.exports.create_admin_get = (req, res) => {
    res.send('--Create Admin Form--');
}

module.exports.create_admin_post = async (req, res) => {
    const { adminRole, name, email, contactNo, staffId, password } = req.body;

    try {
        const admin = await Admin.create({ adminRole, name, email, contactNo, staffId, password });
        res.status(400).json({ admin: admin._id });

    } catch (err) {
        const errors = handleErrors(err);
        console.log({ errors });
        res.status(400).json({ errors });
    }
}