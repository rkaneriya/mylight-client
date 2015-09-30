var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Table = require('react-bootstrap').Table; 
var Col = require('react-bootstrap').Col; 
var CharityListItem = require('./CharityListItem'); 

var CharityList = React.createClass({
    render: function() {
        return (
            <div className="col-sm-9 col-md-10 main">
                <h1>CHARITY LIST</h1>
                <CharityListItem name='GiveWell' description='A cool organization' location='NJ, USA' type='personal'/>
                <CharityListItem name='GiveWell' description='A cool organization' location='NJ, USA' type='community'/>
                <CharityListItem name='GiveWell' description='A cool organization' location='NJ, USA' type='personal'/>
            </div>
        ); 
    }
});

module.exports = CharityList;