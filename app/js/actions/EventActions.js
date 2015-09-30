var Reflux = require('reflux');
var ApiClient = require('../utils/api-client'); 

var actions = Reflux.createActions({
	'loadEventData': { asyncResult: true },
	'addGuest': {},
	'deleteGuest': {}, 
	'updateGuest': {},
	'importGuests': {}
});

actions.loadEventData.preEmit = function(id) { 
    ApiClient.getEventData(id, this.completed, this.failed); 
}; 

module.exports = actions;