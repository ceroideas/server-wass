const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommunitySchema = new Schema({
    street: {
        type: String,
    },
    color: {
        type: String,
    },
    locations:{
        type: [Schema.Types.Mixed]
    },
    comments:{
        type: [Schema.Types.Mixed]
    },
    visits:{
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

module.exports = mongoose.model('Community', CommunitySchema);