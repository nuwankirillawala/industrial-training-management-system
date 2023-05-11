const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// check current user

const checkUser = (req, res, next) => {
    let token;

    // 1) check for the JWT token
    req.cookies?.jwt ? (token = req.cookies.jwt) : token = null;
    // const token = req.cookies.jwt

    console.log('jwt token', token);

    if (!token) {
        // const error = new Error("You are not logged in! Please login again")
        // error.status = 401;
        // return next(error);
        res.locals.user = null;
        return res.status(401).json({ error: "You are not logged in! Please login again" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (error, currentUser) => {
        if (error) {
            console.log({ 'error': error.message });
            res.locals.user = null;

            // const error = new Error("user is not available")
            // error.status = 401;
            // return next(error);
            return res.status(401).json({ error: "user is not available" });
        }
        const user = {
            id: currentUser.id,
            role: currentUser.role,
        };

        req.user = user;
        res.locals.user = user;
        next();
    })
    // next();

}

// restrict routes to users
const restrictedTo = (...roles) => {
    return (req, res, next) => {
        // roles = ['system-admin', 'department-coordinator', 'supervisor', 'undergraduate', 'alumni']
        if (!roles.includes(req.user.role)) {
            // const error = new Error("You don't have permission to perform this action!")
            // error.status = 403;
            // return next(error);
            return res.status(403).json({error: "You don't have permission to perform this action!"})
        }
        next();
    }
}

module.exports = { checkUser, restrictedTo };