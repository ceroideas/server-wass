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

        if(image){
            cloudinary.uploader.upload(image, 
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
                        status: reqPlace.status,
                        position: {
                            address: reqPlace.address,
                            lat: reqPlace.latitude,
                            lng: reqPlace.longitude,
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
                    address: reqPlace.address,
                    lat: reqPlace.latitude,
                    lng: reqPlace.longitude,
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

    update: (req, res) => {
        let image = req.body.image;

        Place.findById(req.params.placeId, function(err, place){

            if (err){
                res.json({ success: false});
            }

            if(image){
                cloudinary.uploader.upload(image, 
                    { tags: "basic_sample", 
                    folder: 'places',
                    use_filename: true}, 
                    function (err, image) {
                    if (err) { console.warn(err); } else {
                        place.images = {
                            img: image.url
                        }

                        place.save();
                    }
                });
            }

            place.title = req.body.title;
            place.shortDescription = req.body.shortDescription;
            place.description = req.body.description;
            place.status = req.body.status;
            place.author = req.body.author;
            place.position = {
                address: req.body.address,
                lat: req.body.latitude,
                lng: req.body.longitude,
            },

            
            place.save((error, place) => {

                if(error){
                    res.status(500).send({success: false, error});
                } else {
                    res.status(201).json({success: true, place});
                }
            });
        })
    },

    findOne: (req, res) => {
        Place.findById(req.params.placeId, function(err, place){

            if (err){
                res.json({ success: false});
            }
            res.json({ success: true, place});
        })
    },

    delete: (req, res) => {
        Place.findByIdAndRemove(req.params.placeId, function (err, place) {
            if (err){
                res.json({ success: false});
            }
            res.json({ success: true});
        });
    },
}