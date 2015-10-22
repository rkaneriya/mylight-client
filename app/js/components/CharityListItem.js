var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link; 

var Table = require('react-bootstrap').Table; 
var Col = require('react-bootstrap').Col; 
var Badge = require('react-bootstrap').Badge; 
var categories = require('../utils/categories').upper; 
var colors = require('../utils/categories').color;

var CharityListItem = React.createClass({
    render: function() {
        var color = colors[this.props.category]; 
        return (
            <div style={{ marginRight: '20px' }}>
                <div className='charity-name'>
                    <Link to="/mylight/charities/123">
                        <h3>
                            <b><i>{ this.props.name }</i></b>
                            <span className='badge' style={{ marginLeft: '10px', backgroundColor: color, color: 'black' }}>{ categories[this.props.category] }</span>

                        </h3>
                    </Link>
                </div><br/>
                <div className='charity-metadata'>{ (this.props.state == 'FO') ? this.props.city : <span>{this.props.city}, {this.props.state}, USA</span> }</div><br/>
                <div className='charity-description'>{ this.props.description }</div>
                <hr/>
            </div>
        ); 
    }
});

module.exports = CharityListItem;


// { (this.props.type === 'Personal') ?
//     <span className='badge' style={{ marginLeft: '10px', backgroundColor: 'orange' }}>Personal</span> : 
//     <span className='badge' style={{ marginLeft: '10px', backgroundColor: 'yellow', color: 'black' }}>Community</span>
// }