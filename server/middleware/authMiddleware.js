const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// check current user

const checkUser = (req, res, next) => {
    let token;

    // 1) check for the JWT token
    req.cookies?.jwt ? (token = req.cookies.jwt) : token = null;
    console.log('jwt token', token);

    if (!token) {
        res.locals.user = null;
        return res.status(401).json({ error: "You are not logged in! Please login again" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (error, currentUser) => {
        if (error) {
            console.log({ 'error': error.message });
            res.locals.user = null;

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
}

// restrict routes to users
const restrictedTo = (...roles) => {
    return (req, res, next) => {
        console.log(roles);
        console.log(req.user.role);
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({error: "You don't have permission to perform this action!"})
        }
        next();
    }
}

module.exports = { checkUser, restrictedTo };