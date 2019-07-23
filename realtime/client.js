const io = require('socket.io-client');

let socket = io.connect('http://localhost:3000', {reconnect: true});

socket.on('connect', (socket) => {
    console.log('Socket connected from NodeJS');
});

module.exports = socket;