const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

function getCurrentDate(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var today = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var milliseconds = date.getMilliseconds();
    return new Date(Date.UTC(year, month, today, hours, minutes, seconds, milliseconds));
}

const postSchema = new Schema({
    user_id: {type: String, required: true},     // User PK
    userNickName: {type: String, required: true},

    title: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    createdDate: { type: Date, default: getCurrentDate() },
    likeCount: {type: Number, default: 0},
    answerCount: {type: Number, default: 0},

    targetMaxAge: {type: Number, required: true},
    targetMinAge: {type: Number, required: true},
    targetSex: {type: String, required: true},
    targetGrade: {type: Number, required: true},

    auth_read: {type: Number, required: true},
    auth_write: {type: Number, required: true},
    isPrivate: {type: Number, required: true},
});

module.exports = mongoose.model('post', postSchema);