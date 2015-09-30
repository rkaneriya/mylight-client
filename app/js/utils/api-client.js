/* 
	Client-side API client to CRUD releases
*/

var request = require('request'); 

var url = require('../../config/config').API_URL; 

var getAllEvents = function(completed, failed) { 
    request({
        method: 'GET',
        uri: url + '/event'
    }, function(err, res, body) { 
        if (err) failed(err); 
        else completed(JSON.parse(body)); 
    });
}; 

var getEventData = function(id, callback) { 
    request({ 
        method: 'GET',
        uri: (url + '/event/' + id + '/guest')
    }, function(err, res, body) { 
        if (err) throw err; 
        callback(JSON.parse(body)); 
    });
}; 

var putEvent = function(event, completed, failed) { 
    request({
        method: 'PUT', 
        uri: (url + '/event/' + event.eid),
        json: true,
        body: event
    }, function(err, req, body) { 
    	if (err) failed(err); 
        else completed(body); 
    });
};

var postEvent = function(event, completed, failed) { 
    request({ 
        method: 'POST', 
        uri: (url + '/event'),
        json: true,
        body: event
    }, function(err, req, body) {
    	if (err) failed(err);
        else completed(body);  
    }); 
};

var deleteEvent = function(id, completed, failed) { 
   request({ 
        method: 'DELETE', 
        uri: (url + '/event/' + id)
    }, function(err, req, body) { 
    	if (err) failed(err); 
        else completed(body);  
    }); 
};

var postGuest = function(person, eid, completed, failed) { 
    request({ 
        method: 'POST',
        uri: (url + '/person'),
        json: true,
        body: person
    }, function(err, req, body) { 
        if (err) failed(err); 
        else { 
            var guestData = {
                pid: body.result[0].id,
                registered: person.registered,
                approved: person.approved,
                attended: person.attended
            };

            request({
                method: 'POST',
                uri: (url + '/event/' + eid + '/guest'),
                json: true,
                body: guestData
            }, function(err2, req2, body2) { 
                if (err2) failed(err2); 
                else completed(body2); 
            }); 
        }; 
    }); 
};

var putGuest = function(person, flags, pid, eid, completed, failed) { 
    request({ 
        method: 'PUT',
        uri: (url + '/person/' + pid),
        json: true,
        body: person
    }, function(err, req, body) { 
        if (err) failed(err); 
        else { 
            request({
                method: 'PUT',
                uri: (url + '/event/' + eid + '/guest/' + pid),
                json: true,
                body: flags
            }, function(err2, req2, body2) { 
                if (err2) failed(err2); 
                else completed(body2); 
            }); 
        }; 
    }); 
};

// disassociates person from the event, does NOT delete the underlying lead from Marketo  
var deleteGuest = function(eid, pid, completed, failed) { 
    request({ 
        method: 'DELETE', 
        uri: (url + '/event/' + eid + '/guest/' + pid)
    }, function(err, req, body) { 
        if (err) failed(err); 
        else completed(body); 
    }); 
};

var postGuests = function(eid, guests, completed, failed) { 
    request({ 
        method: 'POST',
        uri: (url + '/event/' + eid + '/guest'),
        json: true,
        body: guests
    }, function(err, req, body) { 
        if (err) failed(err); 
        else completed(body); 
    });
}; 

module.exports = { 
	getAllEvents: getAllEvents,
    getEventData: getEventData, 
	putEvent: putEvent, 
	postEvent: postEvent, 
	deleteEvent: deleteEvent,
    postGuest: postGuest,
    putGuest: putGuest,
    deleteGuest: deleteGuest,
    postGuests: postGuests
};