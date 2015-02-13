var express = require('express');


// Get all of our friend data
var data = require('../friend.json');

exports.theirMood = function(req, res){

	res.render('their-mood.html');
	newFriend = {
		"name": req.query.name,
		"image": "http://lorempixel.com/400/400/people"
	}
	data["friend"].push(newFriend);
	console.log(newFriend);
};

//module.exports = router;