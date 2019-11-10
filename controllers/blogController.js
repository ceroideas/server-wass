const Blog = require('../models/Blog');
const cloudinary = require('cloudinary').v2;
const cloudinaryConfig = require('../config/cloudinary');

cloudinary.config({
	cloud_name: cloudinaryConfig.cloud_name, 
  	api_key: cloudinaryConfig.api_key, 
  	api_secret: cloudinaryConfig.api_secret
});

module.exports = {

    create: (req, res) => {
        let reqBlog = req.body;
        let reqImage = req.body.image;

        if(reqImage){
            cloudinary.uploader.upload(reqImage, 
                { tags: "basic_sample", 
                folder: 'blogs',
                use_filename: true}, 
                function (err, image) {
                if (err) { console.warn(err); } else {
                    let newBlog = new Blog({
                        title: reqBlog.title,
                        shortDescription: reqBlog.shortDescription,
                        description: reqBlog.description,
                        author: reqBlog.author,
                        status: reqBlog.status,
                        images: {
                            img: image.url
                        }
                    });
    
                    newBlog.save((error, blog) => {
    
                        if(error){
                            res.status(500).send({success: false, error});
                        } else {
                            res.status(201).json({success: true});
                        }
                    });
                }
            });
        } else {
            let newBlog = new Blog({
                title: reqBlog.title,
                shortDescription: reqBlog.shortDescription,
                description: reqBlog.description,
                author: reqBlog.author,
                status: reqBlog.status,
                images: {
                }
            });

            newBlog.save((error, blog) => {

                if(error){
                    res.status(500).send({success: false, error});
                } else {
                    res.status(201).json({success: true});
                }
            });
        }
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
        let reqImage = req.body.image;

        Blog.findById(req.params.blogId, function(err, blog){

            if (err){
                res.json({ success: false});
            }

            if(reqImage){
                cloudinary.uploader.upload(reqImage,
                    { tags: "basic_sample", 
                    folder: 'blogs',
                    use_filename: true}, 
                    function (err, image) {
                    if (err) { console.warn(err); } else {
                        blog.images = {
                            img: image.url
                        }

                        blog.save();
                    }
                });
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