
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  communityId: {
    type: Schema.Types.ObjectId,
    ref: 'Community'
  },

  comment: {
    type: String
  },
  rate: {
    type: Number
  },

  location: {
    type: Object
  },

  status: {
    type: String,
    default: 'publish'
  },
  
  reports:{
    type: [Schema.Types.Mixed]
  },

  createdOn: {
    type: Date,
    default: Date.now
  },
  
  updatedOn: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Comment", CommentSchema);