var mongoose = require('mongoose');

var EmotionSchema = new mongoose.Schema({

	myemotions:[{	
	name : String,
	defaultCategory: String,
	customCategory: String,
	imageSrc: String,
	timesUsed: Number
}]
});


mongoose.model('myEmotion',EmotionSchema);