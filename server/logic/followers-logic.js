const followersDao = require("../dao/followers-dao");

async function follow(vacationId, userId) {
    await followersDao.follow(vacationId, userId);
}

async function unFollow(vacationId, userId) {
    await followersDao.unFollow(vacationId, userId);
}

async function checkFollowersCount() {
    let response = await followersDao.checkFollowersCount();
    return response;
}


module.exports = {follow, unFollow, checkFollowersCount}