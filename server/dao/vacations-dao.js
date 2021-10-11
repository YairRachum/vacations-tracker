let connection = require("./connection-wrapper")

async function addVacation(vacationData) {
    let sql = `INSERT INTO vacations (vacation_destination, vacation_price, vacation_start_date, vacation_end_date, vacation_description, vacation_image)
    VALUES (?,?,?,?,?,?)`;
    let parameters = [vacationData.destination, vacationData.price, vacationData.startDate, vacationData.endDate, vacationData.description,vacationData.image];

    await connection.executeWithParameters(sql, parameters);

}

async function getVacations(userId) {
    let sql =
        `SELECT 
    v.vacation_id AS id,
    v.vacation_destination AS destination,
    v.vacation_description AS description,
    v.vacation_start_date AS startDate,
    v.vacation_end_date AS endDate,
    v.vacation_price AS price,
    v.vacation_image AS image,
    CASE
        WHEN followed.vacation_id IS NOT NULL THEN 'TRUE'
        ELSE 'FALSE'
    END AS 'isFollowed',
    CASE
        WHEN fv.followers IS NOT NULL THEN fv.followers
        ELSE 0
    END AS 'amountOfFollowers'
    FROM
    vacations v
        LEFT JOIN
    (SELECT 
        vacation_id
    FROM
        followed_vacations
    WHERE
        user_id = ?) followed ON v.vacation_id = followed.vacation_id
        LEFT JOIN
    (SELECT 
        vacation_id, COUNT(vacation_id) AS 'followers'
    FROM
        followed_vacations
    GROUP BY vacation_id) fv ON v.vacation_id = fv.vacation_id
ORDER BY isFollowed DESC`;

    let parameters = [userId];
    let response = await connection.executeWithParameters(sql, parameters);

    return response

}

async function deleteVacation(id) {
    let sql = `delete from vacations where vacation_id = ?`;
    let parameters = [id];
    await connection.executeWithParameters(sql, parameters);
}

async function editVacation(vacation, id) {
    const sql = `update vacations set vacation_destination = ?, vacation_description = ?, vacation_start_date = ?, vacation_end_date = ?, vacation_price = ? where vacation_id = ?`;
    let parameters = [vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, id];

    return await connection.executeWithParameters(sql, parameters);
}


module.exports = { addVacation, getVacations, deleteVacation, editVacation }