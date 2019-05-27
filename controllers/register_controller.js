const User = require('../models/User');

module.exports = {

    signup: function(req, res){
        console.log('NUEVA SOLICITUD');
        let newUser = new User(req.body);

        newUser.save((error, user) => {

            if(error){
                res.status(500).send(error);
            } else {
                res.status(201).json({success: true, data: {userId: user._id}});
            }
        });
    },
}