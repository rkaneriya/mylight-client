var Reflux = require('reflux');

var actions = Reflux.createActions({
    'updatePersonalInfo': {},
    'savePersonalInfo': {}, 
    'load': {},
    'createNewUser': {},
    'toggleFavorite': {}
});

module.exports = actions;