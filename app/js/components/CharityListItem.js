var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Table = require('react-bootstrap').Table; 
var Col = require('react-bootstrap').Col; 
var Badge = require('react-bootstrap').Badge; 

var CharityListItem = React.createClass({
    render: function() {
        return (
            <div>
                <div className='charity-name'>
                    <a href="/mylight/charities/123">
                        <h3>
                            <b><i>{ this.props.name }</i></b>
                            { (this.props.type === 'personal') ?
                                <span className='badge' style={{ marginLeft: '10px', backgroundColor: 'orange' }}>Personal</span> : 
                                <span className='badge' style={{ marginLeft: '10px', backgroundColor: 'yellow', color: 'black' }}>Community</span>
                            }
                        </h3>
                    </a>
                </div><br/>
                <div className='charity-metadata'>{ this.props.location }</div><br/>
                <div className='charity-description'>{ this.props.description }</div>
            </div>
        ); 
    }
});

module.exports = CharityListItem;