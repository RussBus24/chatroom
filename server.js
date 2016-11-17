var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

var usersConnected = 0;

io.on('connection', function (socket) {
    
    console.log('Client connected');
    usersConnected++;
    console.log('Number of connections:' + usersConnected);
    
    socket.on('add user', function(userName) {
        socket.username = userName;
        socket.broadcast.emit('user joined', userName);
    });

    socket.on('disconnect', function() {
        console.log('Client disconnected.');
        usersConnected--;
        console.log('Number of connections:' + usersConnected);
        socket.broadcast.emit('user left', socket.username);
    });
    
    /*socket.on('remove user', function(userName) {
        socket.broadcast.emit('user left', userName);
    });*/
    
    socket.on('message', function(message) {
        console.log('Received message:', message);
        socket.broadcast.emit('message', message);
    });
});

server.listen(process.env.PORT || 8080);