const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const User = require('../models/User');

module.exports = {

    getConversations: (req, res, next) => {
        console.log('************Nueva consulta************');
        let allConversations = [];

        const conversations = Conversation.find({participants: req.body._id })
        .select('_id')
        .exec((error, conversations) => {
            if(error){
                res.status(500).send({success: false, error});
                return next(error);
            }

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
        
                    allConversations.push(message);
                    if(allConversations.length === conversations.length) {
                      res.status(200).json({ conversations: allConversations });
                    }
                })
            })
        });
    },

    getConversation: (req, res, next) => {
        Message.find({ conversationId: req.body.conversationId })
        .select('createdAt body author')
        .sort('-createdAt')
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

        if(!req.body.composedMessage) {
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
            body: req.body.composedMessage,
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
        conversationId: req.params.conversationId,
        body: req.body.composedMessage,
        author: req.user._id
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