const io = require('socket.io-client');

let socket = io.connect('http://localhost:3000', {reconnect: true, query: 'userId=123456789'});

socket.on('connect', (s) => {
    console.log('Socket connected from NodeJS');
});

module.exports = socket;