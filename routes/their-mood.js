var express = require('express');
var router = express.Router();

// Get all of our friend data
var data = require('../friend.json');

exports.view = function(req, res){
	console.log(data);
	res.render('their-mood', data);
};

module.exports = router;