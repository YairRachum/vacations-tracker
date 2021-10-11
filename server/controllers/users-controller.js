const usersLogic = require("../logic/users-logic");
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtLogic = require('../logic/jwt-logic');
const config = require('../config.json');



router.post("/login", async (request, response, next) => {
    let user = request.body;
    try {
        let userData = await usersLogic.login(user);
        response.json(userData);
    }
    catch (error) {
        return next(error);
    }
});

router.get('/login-check', jwtLogic.verifyToken , async (req, res) => {
    jwt.verify(req.token, config.secret, async (err, authData) => {
        if (err) {
            res.json(err);
        } else {
            res.json(authData);
        }
    });
});

router.post("/", async (request, response, next) => {
    try {
        let registrationData = request.body;
        await usersLogic.addUser(registrationData);
        response.json();
    }
    catch (error) {
        return next(error);
    }
});

router.get("/", async (request, response, next) => {
    try {
        await usersLogic.getAllUsers().then(function (data) {
        response.send(JSON.stringify(data))
    })
    }
    catch (error) {
        return next(error);
    }
});

module.exports = router;
