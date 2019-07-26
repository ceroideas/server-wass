const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const User = require('../models/User');
const Blog = require('../models/Blog');

module.exports = {

    getConversations: (req, res, next) => {

        let allConversations = [];
        let conversationUsers = [];

        const conversations = Conversation.find({participants: req.body._id })
        .populate({
            path: 'participants',
            select: 'firstName'
        })
        .exec((error, conversations) => {
            if(error){
                res.status(500).send({success: false, error});
                return next(error);
            }
            
            if(conversations.length){
                conversations.forEach((conversation) => {
                    Message.find({conversationId: conversation._id})
                    .sort('-createdAt')
                    .limit(1)
                    .populate({
                        path: 'author',
                        select: 'firstName'
                    })
                    .exec((error, message) => {
                        if(error){
                            res.status(500).send({success: false, error});
                            return next(error);
                        }
                        // console.log(conversation);
                        allConversations.push(message);

                        if(req.body._id != conversation.participants[0]._id){
                            conversationUsers.push(
                                {
                                    _id: conversation.participants[0]._id,
                                    firstName: conversation.participants[0].firstName
                                }
                            );
                        }
                        if(req.body._id != conversation.participants[1]._id){
                            conversationUsers.push(
                                {
                                    _id: conversation.participants[1]._id,
                                    firstName: conversation.participants[1].firstName
                                }
                            );
                        }

                        if(allConversations.length === conversations.length) {
                            res.status(200).json(
                            { conversations: allConversations, conversationUsers: conversationUsers });
                        }
                    })
                })
            } else {
                res.status(201).json({success: true, conversations: conversations});
            }
        });
    },

    getConversation: (req, res, next) => {
        Message.find({ conversationId: req.body.conversationId })
        .select('createdAt body author')
        // .sort('-createdAt')
        .populate({
        path: 'author',
        select: 'firstName'
        })
        .exec(function(err, messages) {
        if (err) {
            res.send({ error: err });
            return next(err);
        }

        res.status(200).json({ messages });
        });
    },

    newConversation: (req, res, next) => {
        
        if(!req.body.recipient) {
            res.status(422).send({ error: 'Please choose a valid recipient for your message.' });
            return next();
        }

        if(!req.body.message) {
            res.status(422).send({ error: 'Please enter a message.' });
            return next();
        }

        const conversation = new Conversation({
            participants: [req.body._id, req.body.recipient]
        });

        conversation.save(function(err, newConversation) {
            if (err) {
            res.send({ error: err });
            return next(err);
            }

            const message = new Message({
            conversationId: newConversation._id,
            body: req.body.message,
            author: req.body._id
            });

            message.save(function(err, newMessage) {
            if (err) {
                res.send({ error: err });
                return next(err);
            }

            res.status(200).json({ message: 'Conversation started!', conversationId: conversation._id });
            return next();
            });
        });
    },

    sendReply: (req, res, next) => {
        const reply = new Message({
        conversationId: req.body.conversationId,
        body: req.body.message,
        author: req.body._id
        });
    
        reply.save(function(err, sentReply) {
        if (err) {
            res.send({ error: err });
            return next(err);
        }
    
        res.status(200).json({ message: 'Reply successfully sent!' });
        return(next);
        });
    }
}