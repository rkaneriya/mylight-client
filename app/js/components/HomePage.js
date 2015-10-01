var React = require('react');
var Reflux = require('reflux');

var MAIN_URL = require('../../config/config').MAIN_URL; 

var HomePage = React.createClass({
    onSubmit: function() { 
        window.open(MAIN_URL + '/mylight', '_self');    
    }, 

    render: function() {
        return (    
            <div className="container">
                <center>
                    <span className='title'>MyLight</span>
                    <br/><br/>
                    <span className='subtitle'>The one-stop-shop for the average philanthropist.</span>
                </center>
                <br/><br/>
                <form className="form-signin">
                    <label htmlFor="inputEmail" className="sr-only">Username</label>
                    <input type="text" id="inputUsername" className="form-control" placeholder="Email" ref="username" required autofocus/>
                    
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" ref="password" required/>
                    
                    <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={ this.onSubmit }>Sign in</button>
                </form>
                <br/>
                <center>
                    <a href="#">Create new account</a>
                </center>
            </div>
        );
    }
});

module.exports = HomePage;