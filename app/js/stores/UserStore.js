var Reflux = require('reflux');
var request = require('request'); 
var _ = require('underscore'); 
var moment = require('moment'); 

var UserActions = require('../actions/UserActions');
var ApiClient = require('../utils/api-client'); 
var MAIN_URL = require('../../config/config').MAIN_URL; 

var _personal_info = {}; 
var _notifications = []; 
var _recommendations = []; 
var _friends = [];  

var UserStore = Reflux.createStore({
    listenables: UserActions, 

    getInitialState: function() {
        return { 
            personal_info: _personal_info,
            notifications: _notifications,
            recommendations: _recommendations,
            friends: _friends
        };
    },

    onAuthenticate: function(username, password_hash, session_id, router) {
        var self = this; 

        ApiClient.authenticate(username, password_hash, session_id, function(res) {
            if (res.status) { 
                _personal_info = res.personal_info;  
                _notifications = res.notifications; 
                _recommendations = res.recommendations;
                _friends = res.friends;

                localStorage.setItem('auth', res.auth); 
                router.transitionTo('/mylight'); 

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

    onCheckAuth: function(uid, session_id) { 
        var self = this; 
        ApiClient.onCheckAuth(uid, session_id, function(res) {
            if (res.auth) { 
                self.trigger({ auth: true }); 
            } else { 
                self.trigger({ auth: false }); 
            }
        }, function(res) {
            console.log("failed"); 
        }); 
    }
});


module.exports = UserStore; 