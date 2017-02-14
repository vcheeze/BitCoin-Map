//Set up requirements
var express = require("express");
var logger = require('morgan');
var Request = require('request');

//Create an 'express' object
var app = express();

//Some Middleware - log requests to the terminal console
app.use(logger('dev'));

//Set up the views directory
app.set("views", __dirname + '/views');
//Set EJS as templating language WITH html as an extension
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
//Add connection to the public folder for css & js files
app.use(express.static(__dirname + '/public'));

/*======== ROUTES ========*/
// CORS enable routes
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// Landing page route
app.get("/", function(req, res) {
	res.render("index");
});

// Documentation route
app.get("/doc", function(req, res) {
	res.render("doc");
});

// JSON serving route
app.get("/api/:code", function(req, res) {
	//CORS enable this route - http://enable-cors.org/server.html
	res.header('Access-Control-Allow-Origin', "*");
	var currencyCode = req.params.code;
	var requestURL = "http://api.coindesk.com/v1/bpi/currentprice/" + currencyCode + ".json";
	Request(requestURL, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			//console.log(body);
			var theData = JSON.parse(body);
			//console.log(theData);
			//send all the data
			res.json(theData);
		}
	});
});

// Everything else
app.get("*", function(req, res) {
	res.send("Try doing something valid. For instance, look up the correct currency codes and type them in the URL");
});
/*========================*/

// Start the server
app.listen(3000);
console.log('Express started on port 3000');