var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var FriendList = React.createClass({
    render: function() {
        return (
            <div className="col-sm-9 col-md-10 main">
                <h1>FRIEND LIST</h1>
            </div>
        ); 
    }
});

module.exports = FriendList;