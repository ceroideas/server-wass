const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema({

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
    images: {
        type: [Schema.Types.Mixed]
    },
    comments:{
        type: [Schema.Types.Mixed]
    },
    favorites:{
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

module.exports = mongoose.model('Blog', BlogSchema);