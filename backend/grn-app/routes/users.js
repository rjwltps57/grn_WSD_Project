var express = require('express');
var router = express.Router();
const User_DB = require('../models/user');

// router.get('/:name/:age', function(req, res, next) {
//     const {name, age} = req.params;
//     res.status(200).json({
//       'name' : name,
//       'age' : age
//     });
//   });

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
                res.json(newUser);
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

module.exports = router;