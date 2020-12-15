const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const postSchema = new Schema({
    user_id: {type: String, required: true},     // User PK
    userNickName: {type: String, required: true},

    title: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    createdDate: { type: Date },
    likeCount: {type: Number, default: 0},
    answerCount: {type: Number, default: 0},

    auth_read: {type: Number, required: true},
    auth_write: {type: Number, required: true},
    isPrivate: {type: Number, required: true},

    targetMaxAge: {type: Number, default: 0},
    targetMinAge: {type: Number, default: 0},
    targetSex: {type: String, default: 'both'},
    targetGrade: {type: Number, default: 1},
});

module.exports = mongoose.model('post', postSchema);