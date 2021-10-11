const express = require("express");
const expressServer = express();

const http = require("http"); // More basic server than express.
const httpServer = http.createServer(expressServer); 
const socketServer = require("socket.io")(httpServer, {
    cors:{
        origin: "http://localhost:3000"
    }
});

let clients = 0;

// 1. Server got the client connection:
socketServer.sockets.on("connection", socket => {
    console.log("Connection request");
    clients++
    console.log("One client has been connected... Total clients: " + clients);

    // 2. Server got a new vacations array from the client:
    socket.on("add-vacation-from-client", vacations => {
            socket.broadcast.emit("add-vacation-from-server", vacations);
    });
    // 3. Server got vacation Object to update:
    socket.on("update-vacation-from-client", vacation =>{
            socket.broadcast.emit("update-vacation-from-server", vacation);
    })
    // 4. Server got an delete reqeust from admin and deletes it everywhere:
    socket.on("delete-vacation-from-client", vacationId =>{
            socket.broadcast.emit("delete-vacation-from-server", vacationId);
    })

    // 5. When user disconnects: 
    socket.on("disconnect", () => {
        clients--;
        console.log("client has disconnected: "+ clients)
    });

});

httpServer.listen(3002, () => console.log("Listening... on 3002 !"));
// Im using port 3002 because my First server run on 3001.
