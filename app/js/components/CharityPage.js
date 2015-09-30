var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var CharityPage = React.createClass({
    render: function() {
        return (
            <div className="col-sm-9 col-md-10 main">
                <h1>
                    GiveWell
                    <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                </h1>
                Data about the charity & visualizations go here  
            </div>
        ); 
    }
});

module.exports = CharityPage;