const vacationsDao = require("../dao/vacations-dao");


async function addVacation(vacationData) {
    await vacationsDao.addVacation(vacationData);
}

async function getVacations(userId) {
    let response = await vacationsDao.getVacations(userId);
    return response
}

async function deleteVacation(id) {
    await vacationsDao.deleteVacation(id);
}

async function editVacation(vacation, id) {
    await vacationsDao.editVacation(vacation, id);
}


module.exports = { addVacation, getVacations, deleteVacation, editVacation }