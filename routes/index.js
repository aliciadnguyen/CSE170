var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();



//var Theirmood = mongoose.model('Theirmood');
var myEmotion = mongoose.model('myEmotion');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});



router.get('/my-mood',function(req, res, next){

	myEmotion.find(function (err, emotions){
		if (err){
			console.log(err);
			return next(err);
		}
		res.json(emotions);
	});	
});


router.put('/my-mood/update',function(req, res, next){
	
	//console.log(req.body);
	//console.log(req.body._id);
	var timesUsed = req.body.timesUsed;
	myEmotion.findByIdAndUpdate(req.body._id,{timesUsed : timesUsed},function (err,mymood){
		if(err){
			return next(err);
		}

		res.json(mymood);
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
