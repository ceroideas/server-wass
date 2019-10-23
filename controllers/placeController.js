const Place = require('../models/Place');
const cloudinary = require('cloudinary').v2;
const cloudinaryConfig = require('../config/cloudinary');
const places = require('../seeders/places');

cloudinary.config({
	cloud_name: cloudinaryConfig.cloud_name, 
  	api_key: cloudinaryConfig.api_key, 
  	api_secret: cloudinaryConfig.api_secret
});

module.exports = {

    uploadData: (req, res) => {
        places.map((place) => {
            
            let newPlace = new Place(place);
            newPlace.save();

        });
    },

    create: (req, res) => {
        let reqPlace = req.body;
        let image = req.body.image;

        if(image.value){
            cloudinary.uploader.upload(
                "data:"+image.filetype+";base64,"+image.value, 
                { tags: "basic_sample", 
                folder: 'places',
                use_filename: true}, 
                function (err, image) {
                if (err) { console.warn(err); } else {
                    let newPlace = new Place({
                        title: reqPlace.title,
                        shortDescription: reqPlace.shortDescription,
                        description: reqPlace.description,
                        author: reqPlace.author,
                        position: {
                            lat: reqPlace.position.lat,
                            lng: reqPlace.position.lng,
                        },
                        images: {
                            img: image.url
                        }
                    });
    
                    newPlace.save((error, place) => {
    
                        if(error){
                            res.status(500).send({success: false, error});
                        } else {
                            res.status(201).json({success: true});
                        }
                    });
                }
            });
        } else {
            let newPlace = new Place({
                title: reqPlace.title,
                shortDescription: reqPlace.shortDescription,
                description: reqPlace.description,
                author: reqPlace.author,
                status: reqPlace.status,
                position: {
                    lat: reqPlace.position.lat,
                    lng: reqPlace.position.lng,
                },
                images: {
                }
            });

            newPlace.save((error, place) => {

                if(error){
                    res.status(500).send({success: false, error});
                } else {
                    res.status(201).json({success: true});
                }
            });
        }
    },

    findAll: (req, res) => {
        const getPlaces = Place.find().sort({_id: -1}).exec();
        
        getPlaces.then((places) => {
            res.status(201).json({success: true, places});
        }).catch((error) => {
            res.status(500).send({success: false, error});
        });
    },

    // update: (req, res) => {
    //     let image = req.body.image;

    //     Blog.findById(req.params.blogId, function(err, blog){

    //         if (err){
    //             res.json({ success: false});
    //         }

    //         if(image.value){
    //             cloudinary.uploader.upload(
    //                 "data:"+image.filetype+";base64,"+image.value, 
    //                 { tags: "basic_sample", 
    //                 folder: 'blogs',
    //                 use_filename: true}, 
    //                 function (err, image) {
    //                 if (err) { console.warn(err); } else {
    //                     blog.images = {
    //                         img: image.url
    //                     }

    //                     blog.save();
    //                 }
    //             });
    //         }

    //         blog.title = req.body.title;
    //         blog.shortDescription = req.body.shortDescription;
    //         blog.description = req.body.description;
    //         blog.status = req.body.status;
    //         blog.author = req.body.author;

            
    //         blog.save((error, blog) => {

    //             if(error){
    //                 res.status(500).send({success: false, error});
    //             } else {
    //                 res.status(201).json({success: true, blog});
    //             }
    //         });
    //     })
    // },

    // findOne: (req, res) => {
    //     Blog.findById(req.params.blogId, function(err, blog){

    //         if (err){
    //             res.json({ success: false});
    //         }
    //         res.json({ success: true, blog});
    //     })
    // },

    // delete: (req, res) => {
    //     Blog.findByIdAndRemove(req.params.blogId, function (err, blog) {
    //         if (err){
    //             res.json({ success: false});
    //         }
    //         res.json({ success: true});
    //     });
    // },
}