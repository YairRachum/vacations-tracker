const vacationsLogic = require("../logic/vacations-logic");

const express = require("express");
const { request, response } = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtLogic = require('../logic/jwt-logic');
const config = require('../config.json');

router.post("/", async (request, response, next) => {
    try {
        let vacationData = request.body;
        await vacationsLogic.addVacation(vacationData);
        response.json();
    }
    catch (error) {
        return next(error);
    }
});

//Verify token and send back a good or bad response
router.get('/', jwtLogic.verifyToken , async (req, res) => {
    jwt.verify(req.token, config.secret, async (err, authData) => {
        if (err) {
            res.json(err);
        } else {
            let userId = authData.id
                vacationsLogic.getVacations(userId).then(function (data) {
                res.send(JSON.stringify(data))
            })
        }
    });
});

router.post("/:id", async (request, response, next) => {
    try {
        let vacation = request.body;
        let id = request.params.id;
        await vacationsLogic.editVacation(vacation, id);
    }
    catch (error) {
        return next(error);
    }
});

router.delete("/:id", async (request, response, next) => {
    try {
        let id = request.params.id;
        await vacationsLogic.deleteVacation(id);
    }
    catch (error) {
        return next(error);
    }
});

module.exports = router;