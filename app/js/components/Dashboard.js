var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Authentication = require('../mixins/Authentication'); 
var ApiClient = require('../utils/api-client'); 

var TopNavbar = require('./TopNavbar'); 
var Profile = require('./Profile'); 
var NewsPanel = require('./NewsPanel'); 
var UserStore = require('../stores/UserStore'); 
var auth = require('../utils/auth'); 

var Dashboard = React.createClass({
    mixins: [Reflux.connect(UserStore)],

    statics: { 
        willTransitionTo: function(transition) {
            var loggedIn = auth.loggedIn();
            if (!loggedIn) { 
                // save 'transition' somewhere as 'attemptedTransition'
                transition.redirect('/home'); 
            } 
        }   
    },

    render: function() {
        console.log(this.state); 
        return (
            <div>
                <TopNavbar title='MyLight' />
                <div className='container-fluid'>
                    <div className='row'>
                        <RouteHandler personal_info={ this.state.personal_info }/>
                        <NewsPanel news={ this.props.news } />
                    </div>  
                </div>
            </div>
        ); 
    }
});

module.exports = Dashboard;