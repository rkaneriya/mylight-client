var attempedTransition = null; 

// this is where an API call should be made to determine authentication status (true/false)
var loggedIn = function() { 
	return true; 
}

module.exports = { 
	loggedIn: loggedIn
};