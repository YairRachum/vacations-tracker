let connection = require("./connection-wrapper")

async function addUser(registrationData) {
    let sql = `INSERT INTO users (first_name, last_name, password, user_name, user_type)
    VALUES (?,?,?,?,?)`;

    let userType = "USER"
    let parameters = [registrationData.firstName, registrationData.lastName, registrationData.password, registrationData.userName, userType];

    await connection.executeWithParameters(sql, parameters);
}

async function login(user) {
    let sql = `SELECT id, first_name as "firstName", user_type as "userType" FROM Users WHERE user_name=? and password =?`
    let parameters = [user.userName, user.password];
    let usersLoginResult;
    usersLoginResult = await connection.executeWithParameters(sql, parameters);

    if(usersLoginResult == null || usersLoginResult.length == 0) {
        throw new Error("unauthorized")
    }

    return usersLoginResult[0]
}

async function isUserExistByName(userName){
    let sql = "select user_name userName from users where user_name = ?";
    let parameters = [userName];
    let user = await connection.executeWithParameters(sql, parameters);

    if (!user || user.length == 0) {
        return false;
    }
    
    return true;
}

module.exports={addUser, login, isUserExistByName}