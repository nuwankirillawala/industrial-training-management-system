const jwt = require('jsonwebtoken');
const dotenv =  require('dotenv');

dotenv.config();

//check current user

const checkUser = (req, res, next) =>
 {
    // console.log('request', req);
    const token = req.cookies.jwt;
    console.log('jwt token', token);
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log({'err': err.message});
                res.locals.user = null;
                next();
            } else {
                console.log({'decodedToken': decodedToken});
                const user = {
                    id: decodedToken.id,
                    role: decodedToken.role,
                };
                console.log(user);
                
                if(!user){
                    res.locals.user = null;
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

module.exports = { checkUser };