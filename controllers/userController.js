const User = require('../models/User');

module.exports = {

    index: function(req, res){

        User.find().exec(function(error, users) {
            if (error) res.status(500).send(error);

            if(users.length){
                res.status(201).json({success: true, users});
            }
            res.status(201).json({success: false});
        });
    }
}