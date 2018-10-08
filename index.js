//Set up dependencies
const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const bcrypt = require('bcrypt-nodejs');
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
var Users = require('./models/User');

app.get('/', function (req, res) {
  res.render('index');
})

//post function for new users
app.post('/', function (req, res, cb) {
	//checks if username and email is already in the db
	var app = res;
	Users.find({ username: req.body.user }, function(err, user) {
		if (err) throw err;
			if (user.length) {
				console.log("Username already exists");
				app.redirect(req.get('referer'));
				return null;
		}
		else{
			Users.find({ email: req.body.email }, function(err, user) {
		  		if (err) throw err;
				if (user.length) {
					console.log("Email already exists");
					app.redirect(req.get('referer'));
					return null;
				}
				else{
					//creation of new User using data from form
					var newUser = new Users({
						username: req.body.user,
						password: req.body.pw,
						email: req.body.email
					});
					//saving new user in MongoDB
					newUser.save(function(err) {
						if (err) throw err;
						console.log("User saved successfully");
					});
					app.render('index');
				}
			});
		}
	});
})

app.post('/login', function (req, res, cb) {
	//checks if username exists in db
	var app = res;
  	Users.find({ username: req.body.login }, function(err, user) {
		if (err) throw err;
		//if username is not found
		if (!user.length) {
	  		console.log("User does not exist");
	  		app.redirect(req.get('referer'));
	    	return null;
		}
		else{
			//if username is found, hashed password is decrypted and compared
		    bcrypt.compare(req.body.loginpw, user[0].password, function(err, res) {
				if(res) {
					//if password is correct, redirects to another page
					console.log("Logged in");
					app.render('login');
				} else {
					console.log("Hash does not match");
					app.redirect(req.get('referer'));
				} 
		    });
		}
		});
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
