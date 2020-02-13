const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({  
    conversationId: {
      type: String,
      // type: Schema.Types.ObjectId,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
});

module.exports = mongoose.model('Message', MessageSchema);