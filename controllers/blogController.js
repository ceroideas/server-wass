const Blog = require('../models/Blog');

module.exports = {

    create: (req, res) => {
        res.status(201).json({success: true, message: 'blog create'});
    },

    findAll: (req, res) => {
        const getBlogs = Blog.find().exec();
        
        getBlogs.then((blogs) => {
            res.status(201).json({success: true, blogs});
        }).catch((error) => {
            res.status(500).send({success: false, error});
        });
    },

    update: (req, res) => {
        res.status(201).json({success: true, message: 'blog update'});
    },

    findOne: (req, res) => {
        res.status(201).json({success: true, message: 'blog findOne'});
    },

    delete: (req, res) => {
        res.status(201).json({success: true, message: 'blog delete'});
    },
}