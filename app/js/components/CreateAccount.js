var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var Navigation = Router.Navigation; 

var MAIN_URL = require('../../config/config').MAIN_URL; 
var UserActions = require('../actions/UserActions');
var NewUserStore = require('../stores/NewUserStore');  
var auth = require('../utils/auth'); 

var Col = require('react-bootstrap').Col; 

var CreateAccount = React.createClass({
    mixins: [Navigation, Reflux.connect(NewUserStore)],
    
    statics: { 
        willTransitionTo: function(transition) {
            var loggedIn = auth.loggedIn();
            if (loggedIn) { 
                transition.redirect('/mylight'); 
            } 
        }   
    },

    onCreate: function() { 
        UserActions.createNewUser(document.getElementById('first_name').value, 
            document.getElementById('last_name').value, 
            document.getElementById('username').value, 
            document.getElementById('email').value, 
            document.getElementById('password').value, 
            document.getElementById('confirmPassword').value, 
            this.context.router);
    }, 

    render: function() {
        return (    
            <div className="container">
                <div className="create-account">
                    <span className='title'>MyLight</span>
                    <br/><br/>
                    <span className='subtitle'>Create your MyLight Account</span>
                    <br/>
                    <span style={{ color: 'red' }}>* Required</span>
                    
                    <br/><br/>

                    <div>
                        <span className="create-account-label">First Name: <span style={{ color: 'red' }}>*</span></span>
                        { (this.state.isValid.first_name) ? 
                            <input type="text" id="first_name" className="form-control" placeholder="" ref="first_name" required autofocus/> :
                            <input type="text" id="first_name" className="form-control create-account-error" placeholder="" ref="first_name" required autofocus/>
                        }

                        <span className="create-account-label">Last Name: <span style={{ color: 'red' }}>*</span></span>
                        { (this.state.isValid.last_name) ? 
                            <input type="text" id="last_name" className="form-control" placeholder="" ref="last_name" required autofocus/> :
                            <input type="text" id="last_name" className="form-control create-account-error" placeholder="" ref="last_name" required autofocus/>
                        }

                        <span className="create-account-label">Email:</span>
                        { (this.state.isValid.email) ? 
                            <input type="text" id="email" className="form-control" placeholder="" ref="email" required autofocus/> : 
                            <input type="text" id="email" className="form-control create-account-error" placeholder="" ref="email" required autofocus/>
                        }

                        <span className="create-account-label">Choose your username: <span style={{ color: 'red' }}>*</span></span>                        
                        { (this.state.isValid.username) ? 
                            <input type="text" id="username" className="form-control" placeholder="" ref="username" required autofocus/> : 
                            <input type="text" id="username" className="form-control create-account-error" placeholder="" ref="username" required autofocus/>
                        }
                       
                        <span className="create-account-label">Create a new password: <span style={{ color: 'red' }}>*</span></span>
                        { (this.state.isValid.password) ? 
                            <input type="password" id="password" className="form-control" placeholder="" ref="password" required/> :
                            <input type="password" id="password" className="form-control create-account-error" placeholder="" ref="password" required/>
                        }

                        <span className="create-account-label">Confirm your password: <span style={{ color: 'red' }}>*</span></span>
                        { (this.state.isValid.confirmPassword) ? 
                            <input type="password" id="confirmPassword" className="form-control" placeholder="" ref="confirmPassword" required/> :
                            <input type="password" id="confirmPassword" className="form-control create-account-error" placeholder="" ref="confirmPassword" required/>
                        }

                        <button className="btn btn-lg btn-primary btn-block" onClick={ this.onCreate }>Create Account</button>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = CreateAccount;