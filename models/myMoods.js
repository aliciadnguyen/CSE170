var mongoose = require('mongoose');

var myMoodSchema = new mongoose.Schema({
	name: String,
	defaultCategory: String,
	customCategory: String,
	imageSrc: String,
	timesUsed: Number
});



mongoose.model('Mymood',myMoodSchema);