var React = require('react');
var Reflux = require('reflux');

var TopNavbar = React.createClass ({
    render: function() {
        return (
            <nav className='navbar navbar-inverse navbar-fixed-top'>
                <div className='container-fluid'>
                    <div className='navbar-header'>
                         <a className="navbar-brand" href="/">{ this.props.title }</a>
                    </div>

                    <div id='navbar' className='navbar-collapse collapse'>
                        <ul className='nav navbar-nav navbar-right'>
                            <li><a href="/mylight/charities">Charities</a></li>
                            <li><a href="/mylight/friends">Friends</a></li>
                            <li><a href="/mylight/profile">Profile</a></li>
                            <li><a href="/home">Sign Out</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
});

module.exports = TopNavbar;