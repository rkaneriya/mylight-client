var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link; 

var Table = require('react-bootstrap').Table; 
var Col = require('react-bootstrap').Col; 
var Badge = require('react-bootstrap').Badge; 
var Categories = require('../utils/categories'); 

var CharityListItem = React.createClass({
    render: function() {
        return (
            <div>
                <div className='charity-name'>
                    <Link to="/mylight/charities/123">
                        <h3>
                            <b><i>{ this.props.name }</i></b>
                            { (this.props.type === 'Personal') ?
                                <span className='badge' style={{ marginLeft: '10px', backgroundColor: 'orange' }}>Personal</span> : 
                                <span className='badge' style={{ marginLeft: '10px', backgroundColor: 'yellow', color: 'black' }}>Community</span>
                            }
                        </h3>
                    </Link>
                </div><br/>
                <div className='charity-metadata'>{ this.props.location } | { Categories[this.props.category] }</div><br/>
                <div className='charity-description'>{ this.props.description }</div>
            </div>
        ); 
    }
});

module.exports = CharityListItem;