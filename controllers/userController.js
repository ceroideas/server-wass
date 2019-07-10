const User = require('../models/User');

module.exports = {

    create: (req, res) => {
        res.status(201).json({success: true, message: 'user create'});
    },

    findAll: function(req, res){

        const getUsers = User.find().exec();
        
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