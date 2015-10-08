var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var Navigation = Router.Navigation; 

var MAIN_URL = require('../../config/config').MAIN_URL; 
var UserActions = require('../actions/UserActions'); 
var UserStore = require('../stores/UserStore');
var auth = require('../utils/auth'); 

var NewAccount = React.createClass({
    mixins: [Navigation],
    
    statics: { 
        willTransitionTo: function(transition) {
            var loggedIn = auth.loggedIn();
            if (loggedIn) { 
                // save 'transition' somewhere as 'attemptedTransition'
                transition.redirect('/mylight'); 
            } 
        }   
    },

    onSubmit: function() { 
        var session_id = Math.abs((new Date()).valueOf() & 0xffffffff);
        localStorage.setItem('session_id', session_id); 
        UserActions.authenticate(document.getElementById('username').value, document.getElementById('password').value, session_id, this.context.router);  
    }, 

    render: function() {
        return (    
            <div className="container">
                <div className='home-page'>
                    <span className='subtitle'>Create new account.</span>
                    
                    <div className="form-signin">
                        <label htmlFor="inputUsername" className="sr-only">Username</label>
                        <input type="text" id="username" className="form-control" placeholder="Username" ref="username" required autofocus/>
                        
                        <label htmlFor="inputPassword" className="sr-only">Password</label>
                        <input type="password" id="password" className="form-control" placeholder="Password" ref="password" required/>
                        
                        <button className="btn btn-lg btn-primary btn-block" onClick={ this.onSubmit }>Sign in</button>
                    </div>

                    <br/>

                    <a href="#">Don&#39;t have an account? Creating one is quick and easy.</a>
                </div>
            </div>
        );
    }
});

module.exports = NewAccount;