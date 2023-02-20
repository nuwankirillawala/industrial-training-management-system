const jwt = require('jsonwebtoken');
const dotenv =  require('dotenv');
const Admin = require('../models/Admin');
const Alumni = require('../models/Alumni');
const Undergraduate = require('../models/Undergraduate');
const Supervisor = require('../models/Supervisor');


dotenv.config();

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    //check json web token exists & verified
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            } else {
                console.log(decodedToken);
                next();
            }
        })
    } else {
        console.log("error");
        res.redirect('/login');
    }
}

//check current user

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                console.log(decodedToken);
                let user;
                if(decodedToken.role === 'system-admin' || decodedToken.role === 'department-coordinator'){
                    user = await Admin.findByID(decodedToken.id);
                }
                else if(decodedToken.role === 'undergraduate'){
                    user = await Undergraduate.findByID(decodedToken.id);
                }
                else if(decodedToken.role === 'supervisor'){
                    user = await Supervisor.findByID(decodedToken.id);
                }
                else if(decodedToken.role === 'alumni'){
                    user = await Alumni.findByID(decodedToken.id);
                }

                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports = { requireAuth, checkUser };