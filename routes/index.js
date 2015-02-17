var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();



//var Theirmood = mongoose.model('Theirmood');
var Mymood = mongoose.model('Mymood');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});



router.get('/my-mood',function(req, res, next){

	Mymood.find(function (err,moods){


		if (err){
			console.log(err);
			return next(err);
		}

		res.json(moods);
	});
});


router.get('/their-mood', function(req, res, next){
	Theirmood.find(function (err,tmoods){

		if (err){
			console.log(err);
			return next(err);
		}

		res.json(tmoods);
	});
});


router.post('/their-mood', function(req, res, next){

	var friend = new Theirmood(req.body);
	friend.save(function (err, friend){
		if(err){ return next(err);}

		res.json(friend);
	});
});




module.exports = router;
