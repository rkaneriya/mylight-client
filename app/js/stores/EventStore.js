var Reflux = require('reflux');
var request = require('request'); 
var _ = require('underscore'); 
var moment = require('moment'); 

var EventActions = require('../actions/EventActions');
var ApiClient = require('../utils/api-client'); 
var MAIN_URL = require('../../config/config').MAIN_URL; 

var _guests = []; 
var _event = {}; 

var EventStore = Reflux.createStore({
    listenables: EventActions, 

    getInitialState: function() {
        return { 
            event: _event, 
            guests: _guests, 
            eventLoaded: false 
        };
    },

    onLoadEventDataCompleted: function(payload) { 
        _event = payload.event;
        _guests = payload.guests; 
        this.trigger({ event: _event, guests: _guests, eventLoaded: true }); 
    }, 

    onLoadEventDataFailed: function() { 
        console.log("ERROR"); 
    },

    onAddGuest: function(person, eid) { 
        var self = this; 
        ApiClient.postGuest(person, eid, function(res) {
            _guests.push(person); 
            self.trigger({ guests: _guests });
        }, function(err) { console.log("Error adding guest", err); });
    },  

    onUpdateGuest: function(person, flags, pid, eid) { 
        var self = this; 
        ApiClient.putGuest(person, flags, pid, eid, function(res) { 

            for (var i = 0; i < _guests.length; i++) { 
                if (_guests[i].pid === pid) { 
                    _guests[i] = _.extend(_guests[i], _.extend(person, flags));
                } else continue; 
            }

            self.trigger({ guests: _guests }); 
        }, function(err) { console.log("Error updating guest", err); }); 
    }, 

    onDeleteGuest: function(eid, pid) { 
        var self = this; 
        ApiClient.deleteGuest(eid, pid, function(res) {     
            var idx = _.findIndex(_guests, function(guest) { 
                return (guest.id === pid); 
            });
                    
            _guests.splice(idx, 1); 

            self.trigger({ guests: _guests }); 
        }, function(err) { console.log("Error deleting guest", err); }); 
    },

    onImportGuests: function(guests) { 
        var self = this; 
        ApiClient.postGuests(guests[0].eid, guests, function(res) { 
            location.reload();
        }, function(err) { console.log("Error importing guests", err); }); 
    }
});


module.exports = EventStore; 