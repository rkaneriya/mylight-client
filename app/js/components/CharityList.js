var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var _ = require('underscore'); 

var Table = require('react-bootstrap').Table; 
var Col = require('react-bootstrap').Col; 
var CharityListItem = require('./CharityListItem'); 

var CharityList = React.createClass({
    insertCharities: function() { 
        console.log(this.props.recommendations); 
        return _.map(this.props.recommendations, function(r, i) { 
            return (<CharityListItem key={i} name={r.name} description='A description of the organization' location={r.state + ', USA'} category={r.ntmaj10} type={r.type}/>); 
        }); 
    }, 

    render: function() {
        return (
            <div className="col-sm-9 col-md-10 main">
                <h1>CHARITY LIST</h1>
                { this.insertCharities() } 
           </div>
        ); 
    }
});

module.exports = CharityList;