var Reflux = require('reflux');
var request = require('request'); 
var _ = require('underscore'); 

var UserActions = require('../actions/UserActions');

var ApiClient = require('../utils/api-client'); 
var MAIN_URL = require('../../config/config').MAIN_URL; 

var _isValid = {
    first_name: true,
    last_name: true,
    username: true, 
    email: true, 
    password: true, 
    confirmPassword: true 
}; 

var NewUserStore = Reflux.createStore({
    listenables: [UserActions], 

    getInitialState: function() {
        return { 
            isValid: _isValid
        };
    },

    onCreateNewUser: function(first_name, last_name, username, email, password, confirmPassword, router) { 
        var self = this;

        _isValid.first_name = (first_name.trim() !== ''); 

        _isValid.last_name = (last_name.trim() !== ''); 

        _isValid.username = (username.trim() !== ''); 

        // no email validation yet 

        _isValid.password = (password.length > 5) && (password == confirmPassword); 

        _isValid.confirmPassword = (confirmPassword.length > 5) && (password == confirmPassword);

        if (!_.contains(_.values(_isValid), false)) { 
            ApiClient.createNewUser(first_name, last_name, email, username, password, function(res) { 
                if (res.status) { 
                    localStorage.setItem('jwt', res.jwt); 
                    router.transitionTo('/mylight'); 
                } else { 
                    _isValid.username = res.username; 
                    _isValid.email = res.email; 
                    self.trigger({ isValid: _isValid }); 
                }
            }, function(res) { 
                console.log(res); 
                console.log("error in creating new user - POST request didn't go through"); 
            }); 
        } else { 
            self.trigger({ isValid: _isValid }); 
        }
    }, 
});


module.exports = NewUserStore; 