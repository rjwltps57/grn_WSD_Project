const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const userSchema = new Schema({
    userLikePosts: [String],     // Post PKs
    userLikeAnswers: [String],   // Answer PKs

    userID: {type: String, required: true},
    userPW: {type: String, required: true},
    nickName: {type: String, required: true},
    sex: {type: String, required: true},
    dateOfBirth: {type: String, required: true},

    // 카테고리 별 등급 + 등급 포인트
    cate_lifeGrade: {type: Number, default: 1},     // 일상
    cate_lifeScore: {type: Number, default: 10},
    cate_loveGrade: {type: Number, default: 1},     // 연애
    cate_loveScore: {type: Number, default: 10},
    cate_jobGrade: {type: Number, default: 1},      // 직장
    cate_jobScore: {type: Number, default: 10},
    cate_studyGrade: {type: Number, default: 1},    // 공부
    cate_studyScore: {type: Number, default: 10},
    cate_healthGrade: {type: Number, default: 1},   // 건강
    cate_healthScore: {type: Number, default: 10},
    cate_cureGrade: {type: Number, default: 1},     // 치료
    cate_cureScore: {type: Number, default: 10},
    cate_friendGrade: {type: Number, default: 1},   // 친구
    cate_friendScore: {type: Number, default: 10},
    cate_issueGrade: {type: Number, default: 1},    //이슈
    cate_issueScore: {type: Number, default: 10},
    cate_musicGrade: {type: Number, default: 1},    // 음악
    cate_musicScore: {type: Number, default: 10},
    cate_gameGrade: {type: Number, default: 1},     // 게임
    cate_gameScore: {type: Number, default: 10},
    cate_newsGrade: {type: Number, default: 1},     // 뉴스
    cate_newsScore: {type: Number, default: 10},
    cate_otherGrade: {type: Number, default: 1},    // 자유(기타)
    cate_otherScore: {type: Number, default: 10},
});

module.exports = mongoose.model('user', userSchema);