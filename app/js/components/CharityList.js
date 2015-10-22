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
            return (<CharityListItem key={i} name={r.name} description={r.description} city={r.city} state={r.state} category={r.ntmaj12} revenue={r.totrev2} type={r.type}/>); 
        }); 
    }, 

    render: function() {
        if (_.isEmpty(this.props.recommendations)) { 
            return (
                <img src='/images/facebook.gif' style={{ marginTop: '200px', marginLeft: '400px' }} />
            ); 
        } else { 
            return (
                <div className="col-sm-9 col-md-10 main">
                    <h1>CHARITY LIST</h1>
                    { this.insertCharities() } 
               </div>
            ); 
        }
    }
});

module.exports = CharityList;