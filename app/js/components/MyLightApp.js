var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var MyLightApp = React.createClass({
    componentWillMount: function() { 
        // google.setOnLoadCallback(this.onLoad);
    },

    render: function() {
        return (
            <div>
                <RouteHandler/>
            </div>
        );
    }
});

module.exports = MyLightApp;