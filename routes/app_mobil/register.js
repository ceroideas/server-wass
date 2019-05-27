const express = require('express');
let RegisterController = require('../../controllers/register_controller');

let router = express.Router();

router.route('/signup').post(RegisterController.signup).get((req, res) =>{
    res.send('Bien');
});


module.exports = router;