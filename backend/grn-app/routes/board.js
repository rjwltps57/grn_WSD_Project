var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.json({"result": "ok"});
});

// router.get('/:name/:age', function(req, res, next) {
//     const {name, age} = req.params;
//     res.status(200).json({
//       'name' : name,
//       'age' : age
//     });
//   });

module.exports = router;