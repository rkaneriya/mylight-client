var Reflux = require('reflux');
var ApiClient = require('../utils/api-client'); 

var actions = Reflux.createActions({
	'authenticate': {},
    'checkAuth': {}, 
	'addGuest': {},
	'deleteGuest': {}, 
	'updateGuest': {},
	'importGuests': {}
});

// actions.authenticate.preEmit = function(username, password_hash) { 
//     console.log(username, password_hash); 
//     ApiClient.authenticate(username, password_hash, this.completed, this.failed); 
// }; 

module.exports = actions;