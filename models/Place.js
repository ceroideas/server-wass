const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({

    title: {
        type: String,
        default: ''
    },
    shortDescription: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    author: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        default: 'publish'
    },
    position:{
        type: Object
    },
    images: {
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

module.exports = mongoose.model('Place', PlaceSchema);