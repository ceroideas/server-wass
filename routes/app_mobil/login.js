const express = require('express');
let LoginController = require('../../controllers/login_controller');

let router = express.Router();

router.route('/signin').post(LoginController.signin);


module.exports = router;