
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  firstName: {
    type: String
  },
  nationality: {
    type: String
  },
  avatar: {
    type: String
  },
  status: {
    type: String,
    default: 'enabled', // disabled
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

module.exports = mongoose.model("User", UserSchema);