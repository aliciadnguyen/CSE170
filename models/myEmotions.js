var mongoose = require('mongoose');

var EmotionSchema = new mongoose.Schema({
	name : String,
	defaultCategory: String,
	customCategory: String,
	imageSrc: String,
	timesUsed: Number
});

EmotionSchema.methods.updateUsedTime = function (cb){
	this.timesUsed += 1;
	this.save(cb);
}


mongoose.model('myEmotion',EmotionSchema);