var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Authentication = require('../mixins/Authentication'); 
var UserActions = require('../actions/UserActions'); 

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

    componentWillMount: function() { 
        var jwt = localStorage.getItem('jwt'); 
        UserActions.load(jwt); 
    }, 

    render: function() {
        return (
            <div>
                <TopNavbar title='MyLight' />
                <div className='container-fluid'>
                    <div className='row'>
                        <RouteHandler personal_info={ this.state.personal_info } recommendations={ this.state.recommendations }/>
                        <NewsPanel news={ this.props.news } />
                    </div>  
                </div>
            </div>
        ); 
    }
});

module.exports = Dashboard;