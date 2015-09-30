var Reflux = require('reflux');
var request = require('request'); 
var _ = require('underscore'); 
var moment = require('moment'); 

var EventListActions = require('../actions/EventListActions');
var ApiClient = require('../utils/api-client'); 

var _events = []; 

var EventListStore = Reflux.createStore({
    listenables: EventListActions, 

    getInitialState: function() {
        return { 
            events: _events,
            eventsLoaded: false
        };
    },

    onLoadEventsCompleted: function(events) { 
        _events = events; 
        this.trigger({ events: _events, eventsLoaded: true }); 
    },

    onLoadEventsFailed: function() { 
        console.log('ERROR: GET/events failed'); 
    },

    onCreateEvent: function(event) {
        var self = this; 

        ApiClient.postEvent(event, function(newEvent) {
            event.eid = newEvent.eid;             
            _events.push(event); 
            self.trigger({ events: _events }); 
        }, function(err) { console.log('Failed to create event', err); }); 
    },

    onUpdateEvent: function(event) { 
        var self = this; 

        ApiClient.putEvent(event, function(updatedEvent) {
            var eid = updatedEvent.eid; 

            for (var i = 0; i < _events.length; i++) { 
                if (_events[i].eid === eid) { 
                    _events[i] = _.extend(_events[i], updatedEvent);
                } else continue; 
            }

            self.trigger({ events: _events }); 
        }, function() { console.log('Failed to update'); }); 
    },

    onDeleteEvent: function(eid) {
        var self = this; 

        ApiClient.deleteEvent(eid, function(deletedId) { 
            var idx = _.findIndex(_events, function(event) { 
                return (event.eid === eid); 
            });
                    
            _events.splice(idx, 1); 

            self.trigger({ events: _events }); 
        }, function(err) { console.log('Failed to delete event', err); }); 
    },

    onCancelRelease: function(payload) {
        if (payload.release.id) {
            payload.router.transitionTo('/release/' + payload.release.id); 
        } else {
            _releases.splice(0, 1);
            payload.router.transitionTo('/release/' + _releases[0].id); 
            this.trigger({ releases: _releases });
        }
    }
});

module.exports = EventListStore;