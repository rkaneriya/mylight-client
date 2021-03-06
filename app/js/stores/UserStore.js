var Reflux = require('reflux');
var request = require('request'); 
var _ = require('underscore'); 
var moment = require('moment'); 

var UserActions = require('../actions/UserActions');
var AuthActions = require('../actions/AuthActions'); 

var ApiClient = require('../utils/api-client'); 
var MAIN_URL = require('../../config/config').MAIN_URL; 

var _personal_info = {}; 
var _notifications = []; 
var _recommendations = []; 
var _friends = [];  

var UserStore = Reflux.createStore({
    listenables: [UserActions, AuthActions], 

    getInitialState: function() {
        return { 
            personal_info: _personal_info,
            notifications: _notifications,
            recommendations: _recommendations,
            friends: _friends,
            auth: true
        };
    },

    onAuthenticate: function(username, password_hash, router) {
        var self = this; 

        ApiClient.authenticate(username, password_hash, function(res) {
            if (res.status) { 
                localStorage.setItem('jwt', res.jwt); 
                self.trigger({ auth: true });
                router.transitionTo('/mylight'); 
            } else { 
                self.trigger({ auth: false });  
            }
        }, function(res) {
            console.log("failed"); 
        }); 
    },

    onLoad: function(jwt) { 
        var self = this; 
        
        ApiClient.load(jwt, function(res) { 
            if (res.status) { 
                _personal_info = res.personal_info;  
                _notifications = res.notifications; 
                _recommendations = res.recommendations;
                _friends = res.friends;

                self.trigger({ 
                    personal_info: res.personal_info,
                    notifications: res.notifications,
                    recommendations: res.recommendations,
                    friends: res.friends
                }); 
            } else { 
                console.log("Couldn't find a user associated with the uid in the jwt token"); 
            } 
        }, function(res) { 
            console.log(res, "failed"); 
        });
    },

    onUpdatePersonalInfo: function(prop, newValue) { 
        _personal_info[prop] = newValue; 
        this.trigger({ personal_info: _personal_info }); 
    }, 

    onSavePersonalInfo: function(uid) { 
        var self = this; 

        ApiClient.updatePersonalInfo(uid, _personal_info, function(res) { 
            if (res.status) { 
                _personal_info = res.personal_info;  
                _notifications = res.notifications; 
                _recommendations = res.recommendations;
                _friends = res.friends;

                self.trigger({ 
                    personal_info: res.personal_info,
                    notifications: res.notifications,
                    recommendations: res.recommendations,
                    friends: res.friends
                }); 
            } 
        }, function(res) { 
            console.log("failed"); 
        }); 
    },

    onToggleFavorite: function(uid, ein) {
        ApiClient.toggleFavorite(uid, ein, function(res) {}, function(res) { 
            console.log("failed to toggle favorite");
        });
    }
});


module.exports = UserStore; 