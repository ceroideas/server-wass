const User = require('../models/User');
const cloudinary = require('cloudinary').v2;
const cloudinaryConfig = require('../config/cloudinary');

cloudinary.config({
	cloud_name: cloudinaryConfig.cloud_name, 
  	api_key: cloudinaryConfig.api_key, 
  	api_secret: cloudinaryConfig.api_secret
});

module.exports = {

    signup: function(req, res){
        let avatar = req.body.image;
        if(avatar){
            cloudinary.uploader.upload(avatar, 
                { tags: "basic_sample", 
                folder: 'profiles',
                use_filename: true}, 
                function (err, image) {
                if (err) { console.warn(err); } else {
                    
                    let newUser = new User({
                        firstName: req.body.firstName,
                        nationality: req.body.nationality,
                        email: req.body.email,
                        password: req.body.password,
                        name: req.body.name,
                        avatar: image.url,
                    });
            
                    newUser.save((error, user) => {
            
                        if(error){
                            res.status(500).send(error);
                        } else {
                            res.status(201).json({success: true, data: {userId: user._id}});
                        }
                    });
                }

            });
        } else {


            let newUser = new User({
                firstName: req.body.firstName,
                nationality: req.body.nationality,
                email: req.body.email,
                password: req.body.password,
                name: req.body.name
            });
    
            newUser.save((error, user) => {
    
                if(error){
                    res.status(500).send(error);
                } else {
                    res.status(201).json({success: true, data: {userId: user._id}});
                }
            });

        }
    },
}