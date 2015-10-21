var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var Navigation = Router.Navigation; 

var MAIN_URL = require('../../config/config').MAIN_URL; 
var UserActions = require('../actions/UserActions');
var NewUserActions = require('../actions/NewUserActions'); 
var NewUserStore = require('../stores/NewUserStore');  
var auth = require('../utils/auth'); 

var Col = require('react-bootstrap').Col; 
var Alert = require('react-bootstrap').Alert; 

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

    handleInfoChange: function(prop) {
        NewUserActions.updatePersonalInfo(prop, document.getElementById(prop).value);
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
                        <input type="text" id="first_name" className="form-control" placeholder="" ref="first_name" value={ this.state.personal_info.first_name } onChange={ this.handleInfoChange.bind(this, 'first_name') } required autofocus/> 
                        { (!this.state.isValid.first_name) ? 
                            <Alert bsStyle='warning'>You must provide a first name.</Alert> : ""
                        }

                        <span className="create-account-label">Last Name: <span style={{ color: 'red' }}>*</span></span>
                        <input type="text" id="last_name" className="form-control" placeholder="" ref="last_name" value={ this.state.personal_info.last_name } onChange={ this.handleInfoChange.bind(this, 'last_name') } required/> 
                        { (!this.state.isValid.last_name) ? 
                            <Alert bsStyle='warning'>You must provide a last name.</Alert> : ""
                        }

                        <span className="create-account-label">Choose your username: <span style={{ color: 'red' }}>*</span></span>                        
                        <input type="text" id="username" className="form-control" placeholder="" ref="username" value={ this.state.personal_info.username } onChange={ this.handleInfoChange.bind(this, 'username') } required/> 
                        { (!this.state.isValid.username) ? 
                            <Alert bsStyle='warning'>You must provide a unique username.</Alert> : ""
                        }
                       
                        <span className="create-account-label">Create a new password: <span style={{ color: 'red' }}>*</span></span>
                        <input type="password" id="password" className="form-control" placeholder="" ref="password" value={ this.state.personal_info.password } onChange={ this.handleInfoChange.bind(this, 'password') } required/> 
                        { (!this.state.isValid.password) ? 
                            <Alert bsStyle='warning'>Password must be longer than 5 characters.</Alert> : ""
                        }

                        <span className="create-account-label">Confirm your password: <span style={{ color: 'red' }}>*</span></span>
                        <input type="password" id="confirmPassword" className="form-control" placeholder="" ref="confirmPassword" value={ this.state.personal_info.confirmPassword } onChange={ this.handleInfoChange.bind(this, 'confirmPassword') } required/> 
                        { (!this.state.isValid.confirmPassword) ? 
                            <Alert bsStyle='warning'>Passwords must match.</Alert> : ""
                        }

                        <span className="create-account-label">Email:</span><span className='create-account-sublabel'> (for password recovery only)</span>
                        <input type="text" id="email" className="form-control" placeholder="" ref="email" value={ this.state.personal_info.email } onChange={ this.handleInfoChange.bind(this, 'email') }/> 
                        { (!this.state.isValid.email) ? 
                            <Alert bsStyle='warning'>This email address has already been used to create an account.</Alert> : ""
                        }

                        <button className="btn btn-lg btn-primary btn-block" onClick={ this.onCreate }>Create Account</button>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = CreateAccount;