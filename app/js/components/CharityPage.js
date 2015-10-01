var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Tooltip = require('react-bootstrap').Tooltip; 
var OverlayTrigger = require('react-bootstrap').OverlayTrigger; 

var CharityPage = React.createClass({
    render: function() {
        return (
            <div className="col-sm-9 col-md-10 main">
                <h1>
                    Oxfam America
                    <OverlayTrigger placement="right" overlay={<Tooltip>Favorite</Tooltip>}>
                        <span className="favorite glyphicon glyphicon-star" aria-hidden="true"></span>
                    </OverlayTrigger>
                </h1>
                Data about the charity & visualizations go here  
            </div>
        ); 
    }
});

module.exports = CharityPage;