var mongoose = require('mongoose');


var theirMoodSchema = new mongoose.Schema({
	name: String,
	image: String,
	emoji: [

		emoji1{ category: String,
				imageSRC: String,
				percentage: Number
			},
		emoji2{ category: String,
				imageSRC: String,
				percentage: Number
			},	
		emoji3{ category: String,
				imageSRC: String,
				percentage: Number
			},
		emoji4{ category: String,
				imageSRC: String,
				percentage: Number
			}		
	]
})


mongoose.model('Theirmood',theirMoodSchema);