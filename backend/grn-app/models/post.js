const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const postSchema = new Schema({
    userId: {type: String, required: true},     // User PK

    title: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    createdDate: { type: Date, default: Date.now },
    likeCount: {type: Number, default: 0},
    answerCount: {type: Number, default: 0},

    targetAges: {type: Number, required: true},
    targetSex: {type: String, required: true},
    targetGrade: {type: Number, required: true},

    auth_read: {type: Number, required: true},
    auth_write: {type: Number, required: true},
    isPrivate: {type: Number, required: true},
});

module.exports = mongoose.model('post', postSchema);