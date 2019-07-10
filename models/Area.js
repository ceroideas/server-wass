
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AreaSchema = new Schema({
  locations: {
    type: [Schema.Types.Mixed]
  },

  province: {
    type: String
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

module.exports = mongoose.model("Area", AreaSchema);