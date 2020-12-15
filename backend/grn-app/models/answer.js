const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const answerSchema = new Schema({
    user_id: {type: String, required: true},     // User PK
    post_id: {type: String, required: true},     // Post PK

    userNickName: {type: String, required: true},
    description: {type: String, required: true},
    createdDate: { type: Date },
    likeCount: {type: Number, default: 0},
});

module.exports = mongoose.model('answer', answerSchema);