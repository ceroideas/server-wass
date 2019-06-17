const express = require('express');
let UserController = require('../../controllers/userController');

const router = express.Router();

router.route('/users').get(UserController.index);

module.exports = router;