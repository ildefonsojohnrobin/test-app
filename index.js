//Set up dependencies
const express = require('express')
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var request = require("request");

var options = {
	method: 'POST',
	url: 'https://tenantrobin.auth0.com/oauth/token',
	headers: { 'content-type': 'application/json' },
	body: '{"client_id":"Bvt2S71aH3ux1TXpNNcG8YM6TxhyHWTC","client_secret":"4LqQ70x0D1w58pO9uSG7mjL_-gNSlsNUSN3NFa0i9vuoarLY75VsFOYATqW9SELE","audience":"http://agile-island-42793.herokuapp.com/api/ping","grant_type":"client_credentials"}'
};

// var request = require("request");

// var options = {
// 	method: 'GET',
// 	url: 'https://tenantrobin.auth0.com/oauth/token',
// 	headers: { authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3lOMEl4UmtKQ05UWTJOemRDTnpKQk1USkVPRFkyTjBFeFJUa3hSVGxCTmtZeE5qazVSQSJ9.eyJpc3MiOiJodHRwczovL3RlbmFudHJvYmluLmF1dGgwLmNvbS8iLCJzdWIiOiJlOVFpb2xnNXRDVUtqdk15cklPTFlaODltZkpObFpEVUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9hZ2lsZS1pc2xhbmQtNDI3OTMuaGVyb2t1YXBwLmNvbS9hcGkvcGluZyIsImlhdCI6MTU0Mjg5OTY3MywiZXhwIjoxNTQyOTg2MDczLCJhenAiOiJlOVFpb2xnNXRDVUtqdk15cklPTFlaODltZkpObFpEVSIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.q0TZCFRn0EwAZaQEyrnmH9IRioCRDocovl9Q_g1MSfR6c4ggxJM6k3mDVaAFPmBgdQeFlKGlR7Fu9wJI0L838-qx_kA9_n21j1uvT8QV5HJgiiI6HNkP9Mml_u6KbMQDyKsYOOvpWE0QICWy3YhbpFYIkWxu5kMgi2V7gKaB7eBJy-93OE4p_Os1ulrQG0umiua2CVaX9pKh-e_9X8xgDNjN1yWyfqEHuyRkCDfhXcTv1dQVqZ62Bxb0X_Vw0nJws1mfeIebdJKDbB3RReqz8MJF-VyrfLpJH_Ny6RNV0nb9r1_IzO_WDt8Tv837PUumdRhcXxvvlhkN-6qkewDa-w' }
// };



request(options, function (error, response, body) {
	if (error) throw new Error(error);

	console.log(body);
});

request(options, function (error, response, body) {
	if (error) throw new Error(error);

	console.log(body);
});

var optionsGet = {
	method: 'GET',
	url: 'https://tenantrobin.auth0.com/oauth/token',
	headers: { authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3lOMEl4UmtKQ05UWTJOemRDTnpKQk1USkVPRFkyTjBFeFJUa3hSVGxCTmtZeE5qazVSQSJ9.eyJpc3MiOiJodHRwczovL3RlbmFudHJvYmluLmF1dGgwLmNvbS8iLCJzdWIiOiJlOVFpb2xnNXRDVUtqdk15cklPTFlaODltZkpObFpEVUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9hZ2lsZS1pc2xhbmQtNDI3OTMuaGVyb2t1YXBwLmNvbS9hcGkvcGluZyIsImlhdCI6MTU0Mjg5OTY3MywiZXhwIjoxNTQyOTg2MDczLCJhenAiOiJlOVFpb2xnNXRDVUtqdk15cklPTFlaODltZkpObFpEVSIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.q0TZCFRn0EwAZaQEyrnmH9IRioCRDocovl9Q_g1MSfR6c4ggxJM6k3mDVaAFPmBgdQeFlKGlR7Fu9wJI0L838-qx_kA9_n21j1uvT8QV5HJgiiI6HNkP9Mml_u6KbMQDyKsYOOvpWE0QICWy3YhbpFYIkWxu5kMgi2V7gKaB7eBJy-93OE4p_Os1ulrQG0umiua2CVaX9pKh-e_9X8xgDNjN1yWyfqEHuyRkCDfhXcTv1dQVqZ62Bxb0X_Vw0nJws1mfeIebdJKDbB3RReqz8MJF-VyrfLpJH_Ny6RNV0nb9r1_IzO_WDt8Tv837PUumdRhcXxvvlhkN-6qkewDa-w' }
};

request(optionsGet, function (error, response, body) {
	if (error) throw new Error(error); 
	console.log(body);
});

request(optionsGet, function (error, response, body) {
	if (error) throw new Error(error); 
	console.log(body);
});

const app = express()

//setting up port and server for heroku
const host = '0.0.0.0';
const port = process.env.PORT || 3000;

//Set up database connection
var mongoDB = 'mongodb://root:asdfg123@ds225543.mlab.com:25543/heroku-test-db'
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

//render landing page
app.get('/', function (req, res) {
  res.render('index');
})

var jwtCheck = jwt({
	secret: jwks.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: "https://tenantrobin.auth0.com/.well-known/jwks.json"
	}),
	audience: 'https://agile-island-42793.herokuapp.com/api/ping',
	issuer: "https://tenantrobin.auth0.com/",
	algorithms: ['RS256']
});

app.use(jwtCheck);

app.get('/api/ping', function (req, res) {
	res.send('Secured Resource');
});


//post function for new users
app.post('/', function (req, res, cb) {
	//checks if username and email is already in the db
	var app = res;
	Users.find({ username: req.body.user }, function(err, user) {
		if (err) throw err;
		if (user.length) {
			return res.send("Username already exists");
		}
		else{
			Users.find({ email: req.body.email }, function(err, user) {
		  		if (err) throw err;
				if (user.length) {
					return res.send("Email already exists");
				}
				else{
					//checks if all fields are filled
					if(!req.body.user.length || !req.body.pw.length || !req.body.email.length ){
						return res.send("All fields are required");
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
				}
			});
		}
		app.redirect(req.get('referer'));
	});
})

app.post('/login', function (req, res, cb) {
	//checks if username exists in db
	var app = res;
	if(!req.body.login.length || !req.body.loginpw.length){
		app.send("All fields are required");
	}
	else{
	  	Users.find({ username: req.body.login }, function(err, user) {
			if (err) throw err;
			//if username is not found
			if (!user.length){
				//return app.send("User does not exist");
				return res.status(404).send('Username does not exist in the database');
			}
			else{
				//if username is found, hashed password is decrypted and compared
			    bcrypt.compare(req.body.loginpw, user[0].password, function(err, res) {
					if(res){
						//if password is correct, redirects to another page
						console.log("Logged in");
						app.send('<h1>Welcome, ' + user[0].username + '</h1>');
					}
					else {
						return app.send("Password incorrect");
					} 
			    });
			}
		});		
	}
})

app.post('/reset', function (req, res){
	var app = res;
	if(!req.body.reset.length){
		app.send("Username is required");
	} else {
		Users.find({ username: req.body.reset }, function(err, user) { 
			if (err) throw err;
			if (!user.length){
				return res.status(404).send('Username does not exist in the database');
			}
			else{
				user.findOneAndReplace({username: req.body.reset}, {password: '1234'}, {new: false}, function(err) {
					if (err) throw err;
					console.log("Password reset successfully");
					app.send('<h1>Welcome, ' + user[0].username + '</h1><br>' + 
					'Your new password is 1234 hashed as: ' + user[0].password);
				});		
			}
		});
	}
})

app.listen(port, host, function () {
  console.log('App listening on port:'+port);
})
