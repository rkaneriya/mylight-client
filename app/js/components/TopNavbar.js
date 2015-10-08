var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var Navigation = Router.Navigation; 
var Link = Router.Link; 

var TopNavbar = React.createClass ({
    mixins: [Navigation],

    onSignOut: function() { 
        localStorage.removeItem('session_id'); 
        localStorage.removeItem('auth'); 
        this.transitionTo('/'); 
    }, 

    render: function() {
        return (
            <nav className='navbar navbar-inverse navbar-fixed-top'>
                <div className='container-fluid'>
                    <div className='navbar-header'>
                         <a className="navbar-brand" href="/">{ this.props.title }</a>
                    </div>

                    <div id='navbar' className='navbar-collapse collapse'>
                        <ul className='nav navbar-nav navbar-right'>
                            <li><Link to="/mylight/charities">Charities</Link></li>
                            <li><Link to="/mylight/friends">Friends</Link></li>
                            <li><Link to="/mylight/profile">Profile</Link></li>
                            <li><a href="#" onClick={ this.onSignOut }>Sign Out</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
});

module.exports = TopNavbar;