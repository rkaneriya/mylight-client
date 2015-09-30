var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = require('react-router').Link;

var Button = require('react-bootstrap').Button; 
var Formatter = require('../utils/formatter'); 

var Sidebar = React.createClass ({
    openRegistration: function() { 
        window.open('http://localhost:8000/event/' + this.props.event.eid + '/registration'); 
    }, 

    render: function() {
        var event = this.props.event; 
        var active = this.props.activePage; 
        return (
            <div className='col-sm-3 col-md-2 sidebar'>
                <div id='event-info'>
                    <h4>{ event.name }</h4>
                    <div id='description'>
                        { event.description }
                    </div>
                    <br/>
                    { event.venue } | { event.city }, { event.country }
                    <br/>
                    { Formatter.formatDates(event.start_date, event.end_date) }
                    <br/><br/>
                    <center>
                        <Button bsStyle="success" style={{ float: 'center' }} onClick={ this.openRegistration }>
                            Register Guests
                            <span style={{ marginLeft: '10px' }} className="glyphicon glyphicon-share-alt" aria-hidden="true"></span>
                        </Button>
                        </center>
                    <hr style={{ border: '1px solid black' }}/>
                </div>
                <ul className='nav nav-sidebar'>
                    <li className={ (active === 'guest') ? 'active' : '' }>
                        <Link to={ '/event/' + this.props.event.eid + '/guest' }>
                           Guest List
                        </Link>
                    </li>
                    <li className={ (active === 'reports') ? 'active' : '' }>
                        <Link to={ '/event/' + this.props.event.eid + '/reports' }>
                           Reports
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
});

module.exports = Sidebar;