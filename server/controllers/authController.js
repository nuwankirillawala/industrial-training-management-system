const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Undergraduate = require('../models/Undergraduate');
const Alumni = require('../models/Alumni');
const Supervisor = require('../models/Supervisor');
const sendEmail = require('../utils/email');


// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '', name: '', adminRole: '', regNo: ''};

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
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: maxAge
    });
}

module.exports.login_get = (req, res) => {
    res.send('--Login Form--');
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

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

module.exports.resetPassword_post = async (req, res) => {
    // get user by email
    try {
        let user = await Admin.findOne({email: req.body.email});
        if(!user){
            user = await Undergraduate.findOne({email: req.body.email});
            if(!user){
                user = await Alumni.findOne({email: req.body.email});
                if(!user){
                     user = await Supervisor.findOne({email: req.body.email});
                     if(!user){
                        return res.status(400).json({message: 'Email not found!'});
                     }
                }
            }
        }
        // create password reset token
        const token = jwt.sign({_id: user}, process.env.JWT_SECRET, {expiresIn: 1000*60*30});
        const resetLink = `http://localhost:5000/reset-password/${token}`;
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
        res.status(200).json({message: 'Password reset link sent to your email'});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Server error'});
    }
}

module.exports.resetPasswordToken_get = async (req, res) =>{
    try {
        const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
        let user = await Admin.findById(decoded._id);
        if(!user){
            user = await Undergraduate.findById(decoded._id);
            if(!user){
                user = await Alumni.findById(decoded._id);
                if(!user){
                     user = await Supervisor.findById(decoded._id);
                     if(!user){
                        return res.status(400).json({message: 'Token is invalid'});
                     }
                }
            }
        }
        //render the password reset form
        res.status(200).json({message: `password update form for user: ${user._id}`});
    } catch (err) {
        res.status(500).json({message: 'Server error'});
    }
}

module.exports.updatePassword_patch = async (req, res) => {
    try {
        let user = await Admin.findById(req.body.userId);
        if(!user){
            user = await Undergraduate.findById(req.body.userId);
            if(!user){
                user = await Alumni.findById(req.body.userId);
                if(!user){
                     user = await Supervisor.findById(req.body.userId);
                     if(!user){
                        return res.status(400).json({message: 'Token is invalid'});
                     }
                }
            }
        }

        user.password = req.body.password;
        await user.save();

        //send confirmation email to the user

        res.status(200).json({message: 'Password updated successfully'});
    } catch (err) {
        res.status(500).json({message: 'Server error'});
    }
}