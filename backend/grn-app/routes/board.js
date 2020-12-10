var express = require('express');
var router = express.Router();
const Post_DB = require('../models/post');

router.get('/getPostsByCategory', (req, res, next) => {
    const {category, orderOpt} = req.query;
    Post_DB.find({category: category})
        .sort(`-${orderOpt}`).exec((err, postList) => {
        if (err) { throw err }
        res.json(postList);
    })

})

router.get('/getPostsBySearchBar', (req, res, next) => {
    const {targetString, orderOpt} = req.query;
    Post_DB.find({title: new RegExp(targetString, 'i')})
        .sort(`-${orderOpt}`).exec((err, postList) => {
        if (err) { throw err }
        res.json(postList);
    })
})

module.exports = router;