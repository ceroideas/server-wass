const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const authorSchema = new Schema({_id: String,firstName:String, avatar:String})

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
    author: authorSchema/*{
      type: Schema.Types.ObjectId,
      required: true
    }*/
  },
  {
    timestamps: true
});

module.exports = mongoose.model('Message', MessageSchema);