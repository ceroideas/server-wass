const Community = require('../models/Community');
const communities = require('../config/data');
module.exports = {

    uploadData: (req, res) => {
        communities.map((location) => {
            
            let newCommunity = new Community(location);
            newCommunity.save();

        });
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