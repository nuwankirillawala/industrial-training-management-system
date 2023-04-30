const Admin = require("../models/Admin");
const Alumni = require("../models/Alumni");
const Supervisor = require("../models/Supervisor");
const Undergraduate = require("../models/Undergraduate");
const bcrypt = require('bcrypt');

const authenticateUser = async function(email, password) {
    const userModelList = [Undergraduate, Admin, Supervisor, Alumni];

    for(let i=0; i<userModelList.length; i++){
        const userModel = userModelList[i];
        const user = await userModel.findOne({email});
        if(user){
            const auth = await bcrypt.compare(password, user.password);

            if(auth) {
                return user;
            }
            throw Error('incorrect password');
        }
    }
    throw Error('incorrect email');
}

module.exports = {authenticateUser};