const express = require('express');

const router = express.Router();
const socket = require('../realtime/client');

router.route('/').get((req, res) =>{
    socket.emit('home');
    res.send("Hola mundo");
});

module.exports = router;