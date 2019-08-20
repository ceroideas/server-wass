const express = require('express');
let UserController = require('../../controllers/userController');

let router = express.Router();

router.route('/profile/update').post(UserController.profileUpdate);
router.route('/profile/password/update').post(UserController.profilePasswordUpdate);
router.route('/profile/last-access-app').post(UserController.lastAccessApp);


module.exports = router;