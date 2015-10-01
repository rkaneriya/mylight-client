var React = require('react');
var Reflux = require('reflux');

var MAIN_URL = require('../../config/config').MAIN_URL; 

var NewAccountPage = React.createClass({
    render: function() {
        return (    
            <div className="container">
                <div className='home-page'>
                    <span className='title'>MyLight</span>
                    <br/><br/>
                    <span className='subtitle'>The one-stop-shop for the average philanthropist.</span>

                    <br/><br/>

                    <h4><i>Sign in to find charities and make a difference</i></h4>
                    <form className="form-signin">
                        <label htmlFor="inputEmail" className="sr-only">Username</label>
                        <input type="text" id="inputUsername" className="form-control" placeholder="Username" ref="username" required autofocus/>
                        
                        <label htmlFor="inputPassword" className="sr-only">Password</label>
                        <input type="password" id="inputPassword" className="form-control" placeholder="Password" ref="password" required/>
                        
                        <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={ this.onSubmit }>Sign in</button>
                    </form>

                    <br/>

                    <a href="#">Don't have an account? Creating one is quick and easy.</a>
                </div>
            </div>
        );
    }
});

module.exports = NewAccountPage;