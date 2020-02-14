const express = require('express');
let ChatController = require('../../controllers/chatController');

let router = express.Router();


// View messages to and from authenticated user
router.get('/conversations', ChatController.findAll);
router.get('/conversations/:groupId', ChatController.getConversations);

// router.post('/conversations/messages', ChatController.getConversation);

// Start new conversation
// router.post('/conversations/new', ChatController.newConversation);
router.post('/conversations/new', ChatController.sendReply);
router.get('/delConversations', ChatController.deleteAll);

// Send reply in conversation
// router.post('/conversations/messages/new', ChatController.sendReply);


module.exports = router;