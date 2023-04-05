const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Undergraduate = require('../models/Undergraduate');
const Alumni = require('../models/Alumni');
const Supervisor = require('../models/Supervisor');
const sendEmail = require('../utils/email');
const handleErrors = require('../utils/appErrors');
const catchAsync = require('../utils/catchAsync');
const dotenv = require('dotenv');

dotenv.config();


// create a json web token
const maxAge = 12 * 60 * 60;
const createToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    });
}

module.exports.login = catchAsync(async (req, res) => {
    try {
        const { email, password } = req.body;
        let user;
        user = await Undergraduate.login(email, password);
        if (!user) {
            user = await Admin.login(email, password);
            if (!user) {
                user = await Supervisor.login(email, password);
                if (!user) {
                    user = await Alumni.login(email, password);
                }
            }
        }

        const token = createToken(user._id, user.role);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        // ⚡ cookie.secure must be enables in production.⚡
        res.status(200).json({ user: user._id, role: user.role });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
});

module.exports.getProfile = catchAsync(async (req, res) => {
    try {
        const user = res.locals.user;
        console.log('user in getProfile', user);
        let currentUser;

        if (user.role === 'system-admin' || user.role == 'department-coordinater') {
            currentUser = await Admin.findById(user.id)
        }
        else if (user.role === 'undergraduate') {
            currentUser = await Undergraduate.findById(user.id);
        }
        else if (user.role === 'supervisor') {
            currentUser = await Supervisor.findById(user.id);
        }
        else if (user.role === 'alumni') {
            currentUser = await Alumni.findById(user.id);
        }

        console.log(currentUser);
        res.status(200).json({ user: currentUser });
    } catch (err) {
        console.log(err);
    }
})

module.exports.logout = catchAsync((req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/login');
});

module.exports.resetPassword = catchAsync(async (req, res) => {
    // get user by email
    try {
        let user = await Admin.findOne({ email: req.body.email });
        if (!user) {
            user = await Undergraduate.findOne({ email: req.body.email });
            if (!user) {
                user = await Alumni.findOne({ email: req.body.email });
                if (!user) {
                    user = await Supervisor.findOne({ email: req.body.email });
                    if (!user) {
                        return res.status(400).json({ message: 'Email not found!' });
                    }
                }
            }
        }
        // create password reset token
        const token = jwt.sign({ _id: user }, process.env.JWT_SECRET, { expiresIn: 1000 * 60 * 30 });
        const resetLink = `http://localhost:5000/reset-password/${token}`;

        // const url = `${req.protocol}://${req.get('host')}/reset-password/${token}`;⚡

        // reset button for attach to email
        const resetButton = `<a href="${resetLink}" style="background-color: #4CAF50; color: white; padding: 16px 20px; text-align: center; text-decoration: none; display: inline-block;">Reset Password</a>`
        // message body of email
        const message = `<p>Please click the button below to reset your password(only valid for 15 mins):</p><p>${resetButton}</p>`;

        // send email
        const email = await sendEmail({
            email: user.email,
            subject: `Password reset of ITMS`,
            message
        });

        console.log(resetLink);
        res.status(200).json({ message: 'Password reset link sent to your email' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports.resetPasswordToken = catchAsync(async (req, res) => {
    try {
        const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
        let user = await Admin.findById(decoded._id);
        if (!user) {
            user = await Undergraduate.findById(decoded._id);
            if (!user) {
                user = await Alumni.findById(decoded._id);
                if (!user) {
                    user = await Supervisor.findById(decoded._id);
                    if (!user) {
                        return res.status(400).json({ message: 'Token is invalid' });
                    }
                }
            }
        }
        //render the password reset form
        res.status(200).json({ message: `password update form for user: ${user._id}` });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports.updatePassword = catchAsync(async (req, res) => {
    try {
        let user = await Admin.findById(req.body.userId);
        if (!user) {
            user = await Undergraduate.findById(req.body.userId);
            if (!user) {
                user = await Alumni.findById(req.body.userId);
                if (!user) {
                    user = await Supervisor.findById(req.body.userId);
                    if (!user) {
                        return res.status(400).json({ message: 'Token is invalid' });
                    }
                }
            }
        }

        user.password = req.body.password;
        await user.save();

        //send confirmation email to the user

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});