const Comment = require('../models/Comment');

module.exports = {

    create: (req, res) => {
        let newComment = new Comment({
            comment: req.body.comment,
            location: {latitude: req.body.latitude, longitude: req.body.longitude},
            status: req.body.status
        });

        newComment.save((error, comment) => {

            if(error){
                res.status(500).send({success: false, error});
            } else {
                res.status(201).json({success: true});
            }
        });
    },

    findAll: (req, res) => {
        const getComments = Comment.find().sort({_id: -1}).exec();
        
        getComments.then((comments) => {
            res.status(201).json({success: true, comments});
        }).catch((error) => {
            res.status(500).send({success: false, error});
        });
    },

    update: (req, res) => {
        res.status(201).json({success: true, message: 'comment update'});
    },

    findOne: (req, res) => {
        res.status(201).json({success: true, message: 'comment findOne'});
    },

    delete: (req, res) => {
        Comment.findByIdAndRemove(req.params.commentId, function (err, comment) {
            if (err){
                res.json({ success: false});
            }
            res.json({ success: true});
        });
    },
}