const User = require('../models/User');

module.exports = {

    create: (req, res) => {
        let newUser = new User(req.body);

        newUser.save((error, user) => {

            if(error){
                res.status(500).send({success: false, error});
            } else {
                res.status(201).json({success: true});
            }
        });
    },

    findAll: function(req, res){
        const getUsers = User.find().sort({_id: -1}).exec();
        
        getUsers.then((users) => {
            res.status(201).json({success: true, users});
        }).catch((error) => {
            res.status(500).send({success: false, error});
        });
    },

    update: (req, res) => {
        res.status(201).json({success: true, message: 'user update'});
    },

    findOne: (req, res) => {
        res.status(201).json({success: true, message: 'user findOne'});
    },

    delete: (req, res) => {
        res.status(201).json({success: true, message: 'user delete'});
    }
}