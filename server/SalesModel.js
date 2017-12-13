const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// PROD: (???)
// DEV:  mongodb://localhost:27017/devshop
const connection = mongoose.connect('mongodb://localhost:27017/devshop', {
	useMongoClient: true
});

mongoose.connection.on('error', function(err){
	console.log('Database connection error');
});

const Schema = mongoose.Schema;


const developerSchema = new Schema({
	id: Number,
	login: String,
	avatar_url: String,
	starsCount: Number,
	reposCount: Number,
	followersCount: Number,
	price: Number,
	fullLoaded: Boolean,
	inCart: Boolean,
	org: String,
	workedHours: Number
});

const salesSchema = new Schema({
	projectName: String,
	buyer: String,
	discount: Number,
	company: String,
	developers: [developerSchema],
	date: String
});

const Sale = mongoose.model("sale", salesSchema);
module.exports.Sale = Sale;