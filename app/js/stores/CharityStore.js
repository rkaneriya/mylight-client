var Reflux = require('reflux');
var request = require('request'); 
var _ = require('underscore'); 

var CharityActions = require('../actions/CharityActions');

var ApiClient = require('../utils/api-client'); 
var MAIN_URL = require('../../config/config').MAIN_URL; 

var _charity = {} 

var CharityStore = Reflux.createStore({
    listenables: [CharityActions], 

    getInitialState: function() {
        return { 
            charity: _charity
        };
    },

    onLoadCharity: function(ein) { 
        var self = this; 

        ApiClient.loadCharity(ein, function(res) {
            _charity = res; 
            self.trigger({ charity: _charity }); 
        }, function(res) { 
            console.log("error on loading charity"); 
        }); 
    }
});


module.exports = CharityStore; 