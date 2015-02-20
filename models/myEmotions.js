var mongoose = require('mongoose');

var EmotionSchema = new mongoose.Schema({
	name : String,
	defaultCategory: String,
	customCategory: String,
	imageSrc: String,
	timesUsed: Number
});

mongoose.model('myEmotion',EmotionSchema);