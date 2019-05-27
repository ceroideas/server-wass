const User = require('../models/User');

module.exports = {

    signin: function(req, res){

        User.find({
            email: req.body.email,
            password: req.body.password
        }).exec(function(error, user) {
            if (error) res.status(500).send(error);

            if(user.length){
                res.status(201).json({success: true, user});
            }

            
            res.status(201).json({success: false});
        });
    }
}