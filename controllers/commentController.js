const Comment = require('../models/Comment');

module.exports = {

    create: (req, res) => {
        let newComment = new Comment({
            comment: req.body.comment,
            rate: req.body.rate,
            userId: req.body.userId,
            communityId: req.body.communityId,
            location: {
                name: req.body.communityName,
            },
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

    findLast: function(req, res){
        const getComments = Comment.find().limit(parseInt(req.params.limit)).sort({_id: -1}).exec();
        
        getComments.then((comments) => {
            res.status(201).json({success: true, comments});
        }).catch((error) => {
            res.status(500).send({success: false, error});
        });
    },

    update: (req, res) => {
        Comment.findById(req.params.commentId, function(err, comment){

            if (err){
                res.json({ success: false});
            }
            comment.comment = req.body.comment;
            comment.location.name =  req.body.name;
            comment.location.vicinity =  req.body.vicinity;
            comment.location.latitude =  req.body.latitude;
            comment.location.longitude =  req.body.longitude;
            comment.status = req.body.status;

            comment.save((error, comment) => {

                if(error){
                    res.status(500).send({success: false, error});
                } else {
                    res.status(201).json({success: true, comment});
                }
            });
        })
    },

    findOne: (req, res) => {
        Comment.findById(req.params.commentId, function (err, comment) {
            if (err){
                res.json({ success: false});
            }
            res.json({ success: true, comment});
        });
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