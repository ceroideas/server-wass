const Message = require('../../models/Message');

module.exports = {

    saveMessage(message) {
        const reply = new Message({
            conversationId: "5d39d42eda4f5d2974d16332",
            body: message.body,
            author: message.author._id
            });
        
            reply.save(function(err, sentReply) {
            if (err) {
                return false;
            }
            return true;
        });
    }
}