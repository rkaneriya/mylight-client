var attempedTransition = null; 
var ApiClient = require('./api-client'); 

// this is where an API call should be made to determine authentication status (true/false)
var loggedIn = function() { 
    var jwt = localStorage.getItem('jwt'); 
    return !!jwt; 
}

module.exports = { 
	loggedIn: loggedIn
};