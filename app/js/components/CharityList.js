var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var _ = require('underscore'); 

var Table = require('react-bootstrap').Table; 
var Col = require('react-bootstrap').Col; 
var CharityListItem = require('./CharityListItem'); 

var CharityList = React.createClass({
    insertCharities: function(favs) { 
        var uid = this.props.personal_info.uid; 

        return _.map(this.props.recommendations, function(r, i) { 
            return (<CharityListItem key={i} ein={r.ein} name={r.name} description={r.description} city={r.city} state={r.state} category={r.ntmaj12} revenue={r.totrev2} favorite={_.contains(favs, r.ein)} uid={uid}/>); 
        }); 
    }, 

    render: function() {
        if (_.isEmpty(this.props.recommendations)) { 
            return (
                <img src='/images/facebook.gif' style={{ marginTop: '200px', marginLeft: '400px' }} />
            ); 
        } else { 
            var favs = _.map(this.props.personal_info.favorites, function(f) { return (f.ein); }); 

            return (
                <div className="col-sm-9 col-md-10 main">
                    <h1>CHARITY LIST</h1>
                    <hr/>
                    { this.insertCharities(favs) } 
               </div>
            ); 
        }
    }
});

module.exports = CharityList;