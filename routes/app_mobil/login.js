const express = require('express');
let LoginController = require('../../controllers/login_controller');

let router = express.Router();

router.route('/signin').post(LoginController.signin);
router.route('/push/location').get(LoginController.locationPush);


module.exports = router;