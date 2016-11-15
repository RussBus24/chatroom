$(document).ready(function() {
    var socket = io();
    var input = $('input');
    var messages = $('#messages');
    
    var userName = prompt('What is your nickname?');
    
    socket.emit('add user', userName);
    
    socket.emit('disconnect', userName);
    
    var userNameInput = function(userName) {
        messages.append('<div>' + userName + ' has joined.</div>');
    };
    
    var userNameRemove = function(userName) {
        messages.append('<div>' + userName + ' has left.</div>');
    }

    var addMessage = function(message) {
        messages.append('<div>' + message + '</div>');
    };

    input.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        }
    
        var message = input.val();
        addMessage(message);
        socket.emit('message', message);
        input.val('');
    });
    socket.on('message', addMessage);
    socket.on('user joined', userNameInput);
    socket.on('user left', userNameRemove);
});