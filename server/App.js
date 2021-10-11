const express = require("express");
const server = express();
const usersController = require("./controllers/users-controller");
const vacationsController = require("./controllers/vacations-controller");
const followersController = require("./controllers/followers-controller");
const errorHandler = require("./errors/error-handler");


const cors = require('cors');
server.use(cors({ origin: "http://localhost:3000"}));


server.use(express.json());
server.use("/users", usersController);

server.use("/vacations", vacationsController);

server.use("/followedVacations", followersController);


server.use(errorHandler);
server.listen(3001, () => console.log("Listening on http://localhost:3001"));
