const express = require('express');
let ChatController = require('../../controllers/chatController');

let router = express.Router();


// View messages to and from authenticated user
router.post('/conversations:groupId', ChatController.getConversations);

// router.post('/conversations/messages', ChatController.getConversation);

// Start new conversation
// router.post('/conversations/new', ChatController.newConversation);
router.post('/conversations/new', ChatController.sendReply);

// Send reply in conversation
// router.post('/conversations/messages/new', ChatController.sendReply);


module.exports = router;