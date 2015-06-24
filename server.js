var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

var portNum = 3000;
app.listen(portNum, function () {
	console.log('Taking a shower in port:', portNum);
})

app.use(bodyParser());
app.use(cors());

app.use(express.static(__dirname + '/'));

//
var mongojs = require('mongojs');
var db = mongojs('ecommerce', ['storage']);
var ObjectId = require('mongodb').ObjectID;

// var databaseUrl = "ecommerce"; // "username:password@example.com/mydb"
// var collections = ["storage"]
// var db = require("mongojs").connect(databaseUrl, collections);
//

////////////////////////////////////////////
////////////////////////////////////////////

// working
app.get('/api/get', function (req, res) {
	db.storage.find({}, function (err, response) {
		if (err) res.status(500).json(err);
		else res.json(response);
	})
})

// working
app.post('/api/post', function (req, res) {
	var data = req.body;

	db.storage.save(data, function (err, response) {
		if(err) return res.status(500).json(err);
		else return res.json(response);
	});
})

// working
app.put('/api/put', function (req, res) {
	var data = req.body;

	db.storage.update(
	  { "_id": ObjectId(data._id) }
	  , { $set: { "qty": req.body.qty } }
	  , function (err, response) {
	  	res.send(response);
	  }
	)
})

// working
app.delete('/api/delete/:passedId', function (req, res) {
	db.storage.remove(
		{ "_id" : ObjectId(req.params.passedId) }
		, function (err, response) {
			res.send(response);
		}
	)
})