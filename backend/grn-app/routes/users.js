var express = require('express');
var router = express.Router();
const User_DB = require('../models/user');
const Post_DB = require('../models/post');
const Answer_DB = require('../models/answer');

router.post('/signup', (req, res, next) => {
    var newUser = new User_DB({
        userLikePosts: [],
        userLikeAnswers: [],

        userID: req.body.userID,
        userPW: req.body.userPW,
        nickName: req.body.nickName,
        sex: req.body.sex,
        dateOfBirth: req.body.dateOfBirth,
    });
    User_DB.findOne({userID: req.body.userID}).exec((err, result) => {
        if (result){
            res.json({"err": "userID is duplicated"});
        } else {
            newUser.save((error, newUser) => {
                if (error) { throw error };
                res.json({"result": "ok"});
            })
        }
    })
})

router.post('/login', (req, res, next) => {
    const {userID, userPW} = req.body;
    User_DB.findOne({userID: userID, userPW: userPW}).exec((err, result) => {
        if (result){
            res.json(result);
        } else {
            res.json({"err": "log in fail"});
        }
    })
})

router.post('/createPost', (req, res, next) => {
    User_DB.findById(req.body.user_id, (err, thisUser) => {
        if (err) { throw err }
        var gradeUp = 0;
        eval("thisUser.cate_" + req.body.category + "Score += 5");
        eval("var thisScore = thisUser.cate_" + req.body.category + "Score");
        eval("var thisGrade = thisUser.cate_" + req.body.category + "Grade");
        if (thisScore >= 5000 && thisGrade == 4){
            eval("thisUser.cate_" + req.body.category + "Grade = 5");
            gradeUp = 5;
        }else if (thisScore >= 500 && thisGrade == 3){
            eval("thisUser.cate_" + req.body.category + "Grade = 4");
            gradeUp = 4;
        }else if (thisScore >= 200 && thisGrade == 2){
            eval("thisUser.cate_" + req.body.category + "Grade = 3");
            gradeUp = 3;
        }else if (thisScore >= 20 && thisGrade == 1){
            eval("thisUser.cate_" + req.body.category + "Grade = 2");
            gradeUp = 2;
        }
        
        thisUser.save((err2, updatedUser) => {
            if (err2) { throw err2 }
            var newPost = new Post_DB({
                user_id: req.body.user_id,
                userNickName: req.body.userNickName,
        
                title: req.body.title,
                description: req.body.description,
                category: req.body.category,
        
                targetMaxAge: req.body.targetMaxAge,
                targetMinAge: req.body.targetMinAge,
                targetSex: req.body.targetSex,
                targetGrade: req.body.targetGrade,
                auth_read: req.body.auth_read,
                auth_write: req.body.auth_write,
                isPrivate: req.body.isPrivate,
            });
            newPost.save((err3, newPost) => {
                if (err3) { throw err3 }
                res.json({"gradeUp": gradeUp});
            })
        })
    })
})

router.post('/updatePost', (req, res, next) => {
    Post_DB.findById(req.body.post_id, (err, thisPost) => {
        if (err) { throw err }
        thisPost.title = req.body.title;
        thisPost.description = req.body.description;

        thisPost.targetMaxAge = req.body.targetMaxAge;
        thisPost.targetMinAge = req.body.targetMinAge;
        thisPost.targetSex = req.body.targetSex;
        thisPost.targetGrade = req.body.targetGrade;
        thisPost.auth_read = req.body.auth_read;
        thisPost.auth_write = req.body.auth_write;
        thisPost.isPrivate = req.body.isPrivate;

        thisPost.save((err2, updatedPost) => {
            if (err2) { throw err2 }
            res.json({"result": "ok"});
        })
    })
})

router.post('/deletePost', (req, res, next) => {
    Answer_DB.deleteMany({ post_id: req.body.post_id}, (err) => {
        if (err) { throw err }
        Post_DB.deleteOne({_id: req.body.post_id}, (err2) => {
            if (err2) { throw err2 }
            res.json({"result": "ok"});
        })
    })
})

router.post('/createAnswer', (req, res, next) => {
    User_DB.findById(req.body.user_id, (err, thisUser) => {
        if (err) { throw err }
        var gradeUp = 0;
        eval("thisUser.cate_" + req.body.category + "Score += 1");
        eval("var thisScore = thisUser.cate_" + req.body.category + "Score");
        eval("var thisGrade = thisUser.cate_" + req.body.category + "Grade");
        if (thisScore >= 5000 && thisGrade == 4){
            eval("thisUser.cate_" + req.body.category + "Grade = 5");
            gradeUp = 5;
        }else if (thisScore >= 500 && thisGrade == 3){
            eval("thisUser.cate_" + req.body.category + "Grade = 4");
            gradeUp = 4;
        }else if (thisScore >= 200 && thisGrade == 2){
            eval("thisUser.cate_" + req.body.category + "Grade = 3");
            gradeUp = 3;
        }else if (thisScore >= 20 && thisGrade == 1){
            eval("thisUser.cate_" + req.body.category + "Grade = 2");
            gradeUp = 2;
        }
        
        thisUser.save((err2, updatedUser) => {
            if (err2) { throw err2 }
            Post_DB.findById(req.body.post_id, (err3, thisPost) => {
                if (err3) { throw err3 }
                thisPost.answerCount += 1;
                thisPost.save((err4, updatedPost) => {
                    if (err4) { throw err4 }
                    var newAnswer = new Answer_DB({
                        user_id: req.body.user_id,
                        post_id: req.body.post_id,

                        description: req.body.description,
                    });
                    newAnswer.save((err5) => {
                        if (err5) { throw err5 }
                        res.json({"gradeUp": gradeUp});
                    })
                })
            })
        })
    })
})

router.post('/readAnswers', (req, res, next) => {
    // 고민글 pk로 조회하기 때문에, 보안상 post로 ..
    Answer_DB.find({post_id: req.body.post_id}, (err, answerList) => {
        if (err) { throw err }
        res.json(answerList);
    })
})

router.post('/updateAnswer', (req, res, next) => {
    Answer_DB.findById(req.body.answer_id, (err, thisAnswer) => {
        if (err) { throw err }
        thisAnswer.description = req.body.description;

        thisAnswer.save((err2, updatedAnswer) => {
            if (err2) { throw err2 }
            res.json({"result": "ok"});
        })
    })
})

router.post('/deleteAnswer', (req, res, next) => {
    Answer_DB.findById(req.body.answer_id, (err, thisAnswer) => {
        if (err) { throw err }
        Post_DB.findById(thisAnswer.post_id, (err2, thisPost) => {
            if (err2) { throw err2 }
            if (thisPost.answerCount >= 1)  thisPost.answerCount -= 1;
            thisPost.save((err3) => {
                if (err3) { throw err3 }
                Answer_DB.deleteOne({_id: thisAnswer._id}, (err4) => {
                    if (err4) { throw err4 }
                    res.json({"result": "ok"});
                })
            })
        })
    })
})

router.post('/likePost', (req, res, next) => {
    const {user_id, post_id} = req.body;
    User_DB.findById(user_id, (err, thisUser) => {
        if (err) { throw err }
        
        var likeFlag = 1;
        for (var i = 0; i < thisUser.userLikePosts.length; i++){
            if (post_id == thisUser.userLikePosts[i]){
                // 공감 취소
                thisUser.userLikePosts.remove(post_id);
                likeFlag = 0;
                break;
            }
        }
        if (likeFlag){  // 공감
            thisUser.userLikePosts.push(post_id);
        }
        thisUser.save((err2) => {
            if (err2) { throw err2 }
            Post_DB.findById(post_id, (err3, thisPost) => {
                if (err3) { throw err3 }
                if (likeFlag){
                    thisPost.likeCount += 1;
                } else {
                    thisPost.likeCount -= 1;
                }
                thisPost.save((err4) => {
                    if (err4) { throw err4 }
                    res.json({"likeFlag": likeFlag});
                })
            })
        })
    })
})

router.post('/likeAnswer', (req, res, next) => {
    const {user_id, answer_id} = req.body;
    User_DB.findById(user_id, (err, thisUser) => {
        if (err) { throw err }
        
        var likeFlag = 1;
        for (var i = 0; i < thisUser.userLikeAnswers.length; i++){
            if (answer_id == thisUser.userLikeAnswers[i]){
                // 공감 취소
                thisUser.userLikeAnswers.remove(answer_id);
                likeFlag = 0;
                break;
            }
        }
        if (likeFlag){  // 공감
            thisUser.userLikeAnswers.push(answer_id);
        }
        thisUser.save((err2) => {
            if (err2) { throw err2 }
            Answer_DB.findById(answer_id, (err3, thisAnswer) => {
                if (err3) { throw err3 }
                if (likeFlag){
                    thisAnswer.likeCount += 1;
                } else {
                    thisAnswer.likeCount -= 1;
                }
                thisAnswer.save((err4) => {
                    if (err4) { throw err4 }
                    res.json({"likeFlag": likeFlag});
                })
            })
        })
    })
})

module.exports = router;