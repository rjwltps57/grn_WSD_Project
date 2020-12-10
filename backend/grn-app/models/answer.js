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

const answerSchema = new Schema({
    user_id: {type: String, required: true},     // User PK
    post_id: {type: String, required: true},     // Post PK

    description: {type: String, required: true},
    createdDate: { type: Date, default: getCurrentDate() },
    likeCount: {type: Number, default: 0},
});

module.exports = mongoose.model('answer', answerSchema);