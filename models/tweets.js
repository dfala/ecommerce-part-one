var mongoose = require('mongoose');

var tweetSchema = new Schema({
	content: String,
	date: String,
	user: String
});