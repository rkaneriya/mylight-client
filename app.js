var express = require('express');
var path = require('path');
var app = express();
var request = require('request'); 

var TARGET_URL = require('./app/config/config').TARGET_URL; 
var TEST_RSS = 'https://www.bing.com/news/search?q=oxfam&go=Submit&qs=n&form=NWBQBN&pq=oxfam&sc=8-3&sp=-1&sk=&format=RSS'; 

app.use(express.static(path.join(__dirname, 'dist')));

// API proxy 
app.use('/news', function(req, res) { 
	var url = TEST_RSS;
    req.pipe(request(url)).pipe(res); 
}); 

// forwards all URLs to / (AKA: cede control of routing to react-router)
app.get("*", function(req, res) { 
    var file = __dirname + '/dist/index.html'; 
    res.sendFile(file); 
});

module.exports = app;
