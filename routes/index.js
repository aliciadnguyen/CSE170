var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();



//var Theirmood = mongoose.model('Theirmood');
var myEmotion = mongoose.model('myEmotion');

/* GET home page. */
router.get('/', function(req, res, next) {

var random_num = Math.random();

    res.render("index");
});

router.get('/my-mood',function(req, res, next){

	myEmotion.find(function (err, emotions){
		if (err){
			return next(err);
		}
		res.json(emotions);
	});	
});


router.post('my-mood',function(req, res, next){
	var updateMood = new myEmotion(req);
	updateMood.save(function (err, updatemood){
		if(err){return next(err);}
	});
});


router.put('/my-mood/update',function(req, res, next){
	
	var number = req.body.timesUsed;
	console.log(number);
	myEmotion.findByIdAndUpdate(req.body._id,{timesUsed : number, mostRecent : 1},function (err,mymood){
		if(err){
			return next(err);
		}
		else{
			//console.log("test");
			console.log(mymood);
			//res.location('index');
			res.json(mymood);
		}
	});

});

router.put('/my-mood/updateMostRecent',function(req, res, next){

	myEmotion.findByIdAndUpdate(req.body._id,{mostRecent : 0},function (err,mymood){
		if(err){
			return next(err);
		}
		else{
			//console.log("test");
			console.log(mymood);
			//res.location('index');
			res.json(mymood);
		}
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

// Sorting page routers
router.get('/sorting',function(req, res, next){

	myEmotion.find(function (err, emojiList){
		if (err){
			return next(err);
		}
		res.json(emojiList);
	});	
});


router.post('sorting',function(req, res, next){
	var update = new myEmotion(req);
	update.save(function (err, updateEmoji){
		if(err){return next(err);}
	});
});

// update emoji category
router.put('/sorting/update',function(req, res, next){
	
	//console.log(req.body);
	//console.log(req.body._id);
	var newCategory = req.body.customCategory;
	console.log(newCategory);
	myEmotion.findByIdAndUpdate(req.body._id,{customCategory : newCategory},function (err,emoji){
		if(err){
			return next(err);
		}
		else{
			//console.log("test");
			console.log(emoji);
			//res.location('index');
			res.json(emoji);
		}
	});
});


module.exports = router;
