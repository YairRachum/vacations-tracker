let connection = require("./connection-wrapper")

async function follow(vacationId, userId) {
    let sql = `INSERT INTO followed_vacations (vacation_id, user_id)
    VALUES (?,?)`;

    let parameters = [vacationId, userId];

    await connection.executeWithParameters(sql, parameters);
}

async function unFollow(vacationId, userId) {
    let sql = `DELETE from followed_vacations where vacation_id = ? and user_id= ?`;

    let parameters = [vacationId, userId];

    await connection.executeWithParameters(sql, parameters)
}

async function checkFollowersCount() {
    let sql = `SELECT v.vacation_destination as "destination", count(fv.vacation_id) as "followers"
    FROM
        followed_vacations fv left join vacations v
    on v.vacation_id = fv.vacation_id
    GROUP BY vacation_destination
    `;

    let followerCount =  await connection.execute(sql);
    return followerCount;
    
}

module.exports = { follow, unFollow, checkFollowersCount}