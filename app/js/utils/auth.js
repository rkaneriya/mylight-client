var attempedTransition = null; 
var ApiClient = require('./api-client'); 

// this is where an API call should be made to determine authentication status (true/false)
var loggedIn = function() { 
    var sid = parseInt(localStorage.getItem('session_id')); 
    var auth = parseInt(localStorage.getItem('auth')); 
    return (auth === (sid + 1)); 
}

module.exports = { 
	loggedIn: loggedIn
};