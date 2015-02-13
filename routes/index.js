var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});



//var Theirmood = mongoose.model('Theirmood');
//var Mymood = mongoose.model('Mymood');


module.exports = router;
