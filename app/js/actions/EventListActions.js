var Reflux = require('reflux');
var ApiClient = require('../utils/api-client'); 

var actions = Reflux.createActions({	
	'loadEvents': { asyncResult: true },
	'createEvent': {},
	'deleteEvent': {},
	'updateEvent': {}
});

actions.loadEvents.preEmit = function() { 
    ApiClient.getAllEvents(this.completed, this.failed); 
}; 

module.exports = actions;