const User = require('../models/User');
const cloudinary = require('cloudinary').v2;
const cloudinaryConfig = require('../config/cloudinary');

cloudinary.config({
	cloud_name: cloudinaryConfig.cloud_name, 
  	api_key: cloudinaryConfig.api_key, 
  	api_secret: cloudinaryConfig.api_secret
});

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

    findLast: function(req, res){
        const getUsers = User.find().limit(parseInt(req.params.limit)).sort({_id: -1}).exec();
        
        getUsers.then((users) => {
            res.status(201).json({success: true, users});
        }).catch((error) => {
            res.status(500).send({success: false, error});
        });
    },

    update: (req, res) => {
        User.findById(req.params.userId, function(err, user){

            if (err){
                res.json({ success: false});
            }
            user.name = req.body.name;
            user.firstName =  req.body.firstName;
            user.nationality =  req.body.nationality;
            user.email =  req.body.email;
            user.status = req.body.status;

            user.save((error, user) => {

                if(error){
                    res.status(500).send({success: false, error});
                } else {
                    res.status(201).json({success: true, user});
                }
            });
        })
    },

    findOne: (req, res) => {
        User.findById(req.params.userId, function (err, user) {
            if (err){
                res.json({ success: false});
            }
            res.json({ success: true, user});
        });
    },

    delete: (req, res) => {
        res.status(201).json({success: true, message: 'user delete'});
    },

    profileUpdate: (req, res)=> {
        User.findById(req.body.userId, function (err, user) {
            if (err){
                res.json({ success: false});
            }
            console.log('profileUpdate');
            console.log(req.body);
            let image = req.body.image;

            if(image){
                cloudinary.uploader.upload(image, 
                    { tags: "basic_sample", 
                    folder: 'profiles',
                    use_filename: true}, 
                    function (err, image) {
                    if (err) { console.warn(err); } else {
                        user.avatar = image.url

                        user.save();
                    }
                });
            }

            user.firstName = req.body.firstName;
            user.nationality = req.body.nationality;
            user.save((error, user) => {

                if(error){
                    res.status(500).send({success: false, error});
                } else {
                    res.status(201).json({success: true, user});
                }
            });
        });
    },
    
    profilePasswordUpdate: (req, res)=> {
        User.findById(req.body.userId, function (err, user) {
            if (err){
                res.json({ success: false});
            }
            user.password = req.body.password;
            user.save((error, user) => {

                if(error){
                    res.status(500).send({success: false, error});
                } else {
                    res.status(201).json({success: true});
                }
            });
        });
    },
    
    lastAccessApp: (req, res)=> {
        User.findById(req.body.userId, function (err, user) {
            if (err){
                res.json({ success: false});
            }
            user.lastAccessOn = new Date();
            user.save((error, user) => {

                if(error){
                    res.status(500).send({success: false, error});
                } else {
                    res.status(201).json({success: true});
                }
            });
        });
    },

    profile: (req, res) => {
        User.findById(req.body.userId, function (err, user) {
            if (err){
                res.json({ success: false});
            }
            res.status(201).json({success: true, user: user});
        });
    }
}