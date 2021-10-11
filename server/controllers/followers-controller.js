const followersLogic = require("../logic/followers-logic");

const express = require("express");
const { request, response } = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtLogic = require('../logic/jwt-logic');
const config = require('../config.json');


router.get("/", async (request, response, next) => {
    try {
        let followers = await followersLogic.checkFollowersCount();
        console.log(followers);
        response.json(followers);

    }
    catch (error) {
        return next(error);
    }
});

router.post('/', jwtLogic.verifyToken , async (req, res, next) => {
    jwt.verify(req.token, config.secret, async (err, authData) => {
        try{
            let vacationId = req.body.vacationId;
            let userId = authData.id
            await followersLogic.follow(vacationId, userId);
        }catch(err){
        return next(err);
        }
       
    });
});

router.delete('/', jwtLogic.verifyToken , async (req, res, next) => {
    jwt.verify(req.token, config.secret, async (err, authData) => {
        try{
            let vacationId = req.body.vacationId;
            let userId = authData.id
            await followersLogic.unFollow(vacationId, userId);
        }catch(err){
        return next(err);
        }
       
    });
});


module.exports = router;
