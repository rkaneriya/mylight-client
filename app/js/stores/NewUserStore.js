var Reflux = require('reflux');
var request = require('request'); 
var _ = require('underscore'); 

var UserActions = require('../actions/UserActions');
var NewUserActions = require('../actions/NewUserActions'); 

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

var _personal_info = { 
    first_name: '', 
    last_name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
}

var NewUserStore = Reflux.createStore({
    listenables: [UserActions, NewUserActions], 

    getInitialState: function() {
        return { 
            isValid: _isValid,
            personal_info: _personal_info
        };
    },

    onCreateNewUser: function(first_name, last_name, username, email, password, confirmPassword, router) { 
        var self = this;

        _isValid.first_name = _isValid.first_name && (first_name.trim() !== ''); 
        _isValid.last_name = _isValid.last_name && (last_name.trim() !== ''); 
        _isValid.username = _isValid.username && (username.trim() !== ''); 
        _isValid.password = _isValid.password && (password.trim() !== ''); 
        _isValid.confirmPassword = _isValid.confirmPassword && (confirmPassword.trim() !== ''); 

        if (!_.contains(_.values(_isValid), false)) { 
            ApiClient.createNewUser(first_name, last_name, email, username, password, function(res) { 
                if (res.status) { 
                    localStorage.setItem('jwt', res.jwt); 
                    router.transitionTo('/mylight'); 
                } else { 
                    console.log(res); 
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

    onUpdatePersonalInfo: function(prop, newValue) { 
        var self = this; 

        switch(prop) { 
            case 'first_name':
                _isValid.first_name = (newValue.trim() !== ''); 
                break;
            case 'last_name':
                _isValid.last_name = (newValue.trim() !== ''); 
                break;
            case 'username': 
                _isValid.username = (newValue.trim() !== ''); 
                break;
            case 'password':
                _isValid.password = (newValue.length > 5);
                _isValid.confirmPassword = (newValue == _personal_info.confirmPassword);  
                break;
            case 'confirmPassword':
                _isValid.confirmPassword = (newValue == _personal_info.password);
                break;
            case 'email':
                _isValid.email = true; // change this later 
                break;
            default: 
                break;
        }

        _personal_info[prop] = newValue; 
        this.trigger({ personal_info: _personal_info, isValid: _isValid }); 
    }
});


module.exports = NewUserStore; 