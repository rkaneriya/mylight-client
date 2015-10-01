var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Authentication = require('../mixins/Authentication'); 

var TopNavbar = require('./TopNavbar'); 
var Profile = require('./Profile'); 
var NewsPanel = require('./NewsPanel'); 

var Dashboard = React.createClass({
    mixins: [Authentication], 

    render: function() {
        return (
            <div>
                <TopNavbar title='MyLight' />
                <div className='container-fluid'>
                    <div className='row'>
                        <RouteHandler />
                        <NewsPanel news={ this.props.news } />
                    </div>  
                </div>
            </div>
        ); 
    }
});

module.exports = Dashboard;