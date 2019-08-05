const Blog = require('../models/Blog');

module.exports = {

    create: (req, res) => {
        let newBlog = new Blog(req.body);

        newBlog.save((error, blog) => {

            if(error){
                res.status(500).send({success: false, error});
            } else {
                res.status(201).json({success: true});
            }
        });
    },

    findAll: (req, res) => {
        const getBlogs = Blog.find().sort({_id: -1}).exec();
        
        getBlogs.then((blogs) => {
            res.status(201).json({success: true, blogs});
        }).catch((error) => {
            res.status(500).send({success: false, error});
        });
    },

    update: (req, res) => {
        Blog.findById(req.params.blogId, function(err, blog){

            if (err){
                res.json({ success: false});
            }
            blog.title = req.body.title;
            blog.shortDescription = req.body.shortDescription;
            blog.description = req.body.description;
            blog.status = req.body.status;
            blog.author = req.body.author;

            blog.save((error, blog) => {

                if(error){
                    res.status(500).send({success: false, error});
                } else {
                    res.status(201).json({success: true, blog});
                }
            });
        })
    },

    findOne: (req, res) => {
        Blog.findById(req.params.blogId, function(err, blog){

            if (err){
                res.json({ success: false});
            }
            res.json({ success: true, blog});
        })
    },

    delete: (req, res) => {
        Blog.findByIdAndRemove(req.params.blogId, function (err, blog) {
            if (err){
                res.json({ success: false});
            }
            res.json({ success: true});
        });
    },
}