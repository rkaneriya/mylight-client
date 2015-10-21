var Reflux = require('reflux');

var actions = Reflux.createActions({
    'updatePersonalInfo': {},
    'savePersonalInfo': {}, 
    'load': {},
    'createNewUser': {}
});

module.exports = actions;