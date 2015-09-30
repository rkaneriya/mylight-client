var express = require('express');
var path = require('path');
var app = express();
var request = require('request'); 

var TARGET_URL = require('./app/config/config').TARGET_URL; 

app.use(express.static(path.join(__dirname, 'dist')));

// API proxy 
app.use('/api', function(req, res) { 
	var url = TARGET_URL + req.url; 
	req.pipe(request(url)).pipe(res); 
}); 

// forwards all URLs to / (AKA: cede control of routing to react-router)
app.get("*", function(req, res) { 
    var file = __dirname + '/dist/index.html'; 
    res.sendFile(file); 
});

module.exports = app;
