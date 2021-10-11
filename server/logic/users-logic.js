const usersDao = require("../dao/users-dao");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type")
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const config = require("../config.json");

const saltRight = "yj@#sj%asdg";
const saltLeft = "121$#@GsWhats_up?agRGPql";

async function addUser(registrationData) {
    await validateUserDetailsRegister(registrationData);
    registrationData.password = crypto.createHash("md5").update(saltLeft + registrationData.password + saltRight).digest("hex");
    await usersDao.addUser(registrationData);
}

async function login(user) {
    try{
        user.password = crypto.createHash("md5").update(saltLeft + user.password + saltRight).digest("hex");
        let userDetails = await usersDao.login(user);
        const token = jwt.sign({ firstName: userDetails.firstName , userType: userDetails.userType, id: userDetails.id}, config.secret,{
            expiresIn: "7d"
        });        
        return { token, userType: userDetails.userType, firstName: userDetails.firstName };
    }catch(e) {
        throw new ServerError(ErrorType.UNAUTHORIZED)
    }
}

async function validateUserDetailsRegister(registrationData) {
    if (await usersDao.isUserExistByName(registrationData.userName)) {
        throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST);
    }
}


module.exports = { addUser, login}