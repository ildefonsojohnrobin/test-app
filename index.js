//Set up dependencies
const express = require('express')
const bodyParser = require('body-parser');
const app = express()
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//setting up EJS view
app.use(express.static('public'));
app.set('view engine', 'ejs')

//setting up body-parser
app.use(bodyParser.urlencoded({ extended: true }));

//use User schema located in models/User.js
var User = require('./models/User');

app.get('/', function (req, res) {
  res.render('index');
})

//post function for new users
app.post('/register', function (req, res) {
	//creation of new User using data from form
	var newUser = new User({
		username: req.body.user,
		password: req.body.pw,
		email: req.body.email
	});

	//saving new user in MongoDB
	newUser.save(function(err) {
		if (err) throw err;
		console.log("User saved successfully");
	});
	res.render('index');
})

app.post('/login', function (req, res) {
  // console.log(req.body.login);
  // console.log(req.body.loginpw);
  res.render('index');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
