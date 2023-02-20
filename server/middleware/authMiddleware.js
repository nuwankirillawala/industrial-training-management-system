const jwt = require('jsonwebtoken');
const dotenv =  require('dotenv');

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

module.exports = { requireAuth };