const Area = require('../models/Area');

module.exports = {

    create: (req, res) => {
        res.status(201).json({success: true, message: 'area create'});
    },

    findAll: (req, res) => {
        const getAreas = Area.find().sort({_id: -1}).exec();
        
        getAreas.then((areas) => {
            res.status(201).json({success: true, areas});
        }).catch((error) => {
            res.status(500).send({success: false, error});
        });
    },

    update: (req, res) => {
        res.status(201).json({success: true, message: 'area update'});
    },

    findOne: (req, res) => {
        res.status(201).json({success: true, message: 'area findOne'});
    },

    delete: (req, res) => {
        res.status(201).json({success: true, message: 'area delete'});
    },
}