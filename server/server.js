const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
app.use(express.static(publicPath));
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log("New User Connected");

    socket.emit('newMessage', {
        from: 'drakenguard',
        text: "Hey nigga",
        createdAt: 123
    });

    socket.on('createMessage', (newEmail) => {
        console.log("Message Received: " + JSON.stringify(newEmail));
    })

    socket.on('disconnect', (socket) => {
        console.log("User disconnected");
    })
})

server.listen((port), () => {
    console.log("Listening on port " + port);
})