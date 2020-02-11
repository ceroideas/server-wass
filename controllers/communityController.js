const Community = require('../models/Community');
const communities = require('../config/data');
module.exports = {

    uploadData: (req, res) => {
        communities.map((location) => {
            
            let newCommunity = new Community(location);
            newCommunity.save();

        });
    },

    create: (req, res) => {
        let newCommunity = new Community(req.body);

        newCommunity.save((error, community) => {

            if(error){
                res.status(500).send({success: false, error});
            } else {
                res.status(201).json({success: true});
            }
        });
    },

    findOne: (req, res) => {
        Community.findById(req.params.communityId, function (err, community) {
            if (err){
                res.json({ success: false});
            }
            res.json({ success: true, community});
        });
    },

    update: (req, res) => {
        Community.findById(req.params.communityId, function(err, community){

            if (err){
                res.json({ success: false});
            }
            community.street =  req.body.street;
            community.color = req.body.color;
            community.locations = req.body.locations;

            community.save((error, community) => {

                if(error){
                    res.status(500).send({success: false, error});
                } else {
                    res.status(201).json({success: true, community});
                }
            });
        })
    },
    delete: (req, res)=> {

    },

    findAll: (req, res) => {
        const getCommunities = Community.find().sort({_id: -1}).exec();
        
        getCommunities.then((communities) => {
            res.status(201).json({success: true, communities});
        }).catch((error) => {
            res.status(500).send({success: false, error});
        });
    }
}