const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const answerSchema = new Schema({
    userId: {type: String, required: true},     // User PK
    postId: {type: String, required: true},     // Post PK

    title: {type: String, required: true},
    description: {type: String, required: true},
    createdDate: { type: Date, default: Date.now },
    likeCount: {type: Number, default: 0},
});

module.exports = mongoose.model('answer', answerSchema);