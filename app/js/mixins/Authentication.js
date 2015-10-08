var Router = require('react-router'); 
var auth = require('../utils/auth'); 

var Authentication = { 
    statics: { 
        willTransitionTo: function(transition) { 
            if (!auth.loggedIn()) { 
                // save 'transition' somewhere as 'attemptedTransition'
                transition.redirect('/home'); 
            } else { 
                transition.redirect('/mylight')
            }
        }
    }
}

module.exports = Authentication; 