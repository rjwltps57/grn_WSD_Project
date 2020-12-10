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
        
                targetAges: req.body.targetAges,
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
    Post_DB.findById(req.body.postId, (err, thisPost) => {
        if (err) { throw err }
        thisPost.title = req.body.title;
        thisPost.description = req.body.description;

        thisPost.targetAges = req.body.targetAges;
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
    
})

router.post('/updateAnswer', (req, res, next) => {
    
})

router.post('/deleteAnswer', (req, res, next) => {
    
})

router.post('/likePost', (req, res, next) => {
    
})

router.post('/likeAnswer', (req, res, next) => {
    
})

module.exports = router;