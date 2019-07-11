const Comment = require('../models/Comment');

module.exports = {

    create: (req, res) => {
        res.status(201).json({success: true, message: 'comment create'});
    },

    findAll: (req, res) => {
        const getComments = Comment.find().sort({_id: -1}).exec();
        
        getComments.then((comments) => {
            res.status(201).json({success: true, comments});
        }).catch((error) => {
            res.status(500).send({success: false, error});
        });
    },

    update: (req, res) => {
        res.status(201).json({success: true, message: 'comment update'});
    },

    findOne: (req, res) => {
        res.status(201).json({success: true, message: 'comment findOne'});
    },

    delete: (req, res) => {
        res.status(201).json({success: true, message: 'comment delete'});
    },
}