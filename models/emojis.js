var mongoose = require('mongoose');

var EmojiSchema = new mongoose.Schema({
	name : String,
	defaultCategory: String,
	customCategory: String,
	imageSrc: String
});

mongoose.model('emoji',EmojiSchema);