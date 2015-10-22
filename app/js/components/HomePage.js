var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var Navigation = Router.Navigation; 
var Link = Router.Link; 

var MAIN_URL = require('../../config/config').MAIN_URL; 
var AuthActions = require('../actions/AuthActions');
var UserStore = require('../stores/UserStore');  
var auth = require('../utils/auth'); 

var Alert = require('react-bootstrap').Alert; 

var HomePage = React.createClass({
    mixins: [Navigation, Reflux.connect(UserStore)],
    
    statics: { 
        willTransitionTo: function(transition) {
            var loggedIn = auth.loggedIn();
            if (loggedIn) { 
                transition.redirect('/mylight'); 
            } 
        }   
    },

    onSubmit: function() { 
        AuthActions.authenticate(document.getElementById('username').value, 
            document.getElementById('password').value, this.context.router);  
    }, 

    render: function() {
        return (    
            <div className="container">
                <div className='home-page'>
                    <a href='/home' className='title'>MyLight</a>
                    <br/><br/>
                    <span className='subtitle'>The one-stop-shop for the average philanthropist.</span>
                    
                    <br/><br/>

                    <h4><i>Sign in to find charities and make a difference</i></h4>
                    <div className="form-signin">
                        <label htmlFor="inputUsername" className="sr-only">Username</label>
                        <input type="text" id="username" className="form-control" placeholder="Username" ref="username" required autofocus/>
                        
                        <label htmlFor="inputPassword" className="sr-only">Password</label>
                        <input type="password" id="password" className="form-control" placeholder="Password" ref="password" required/>
                        
                        { (!this.state.auth) ?
                            <div className='failed-auth'>The username and password you entered don&#39;t match.</div> :
                            <span></span>
                        }

                        <button className="btn btn-lg btn-primary btn-block" onClick={ this.onSubmit }>Sign in</button>
                    </div>

                    <br/>

                    <Link to="/sign-up">Create new account</Link>
                </div>
            </div>
        );
    }
});

module.exports = HomePage;