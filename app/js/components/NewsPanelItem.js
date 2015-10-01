var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var NewsPanelItem = React.createClass({
    render: function() {
        return (
            <li>
                <a target='_blank' href={this.props.link}>
                    <div className='news-headline'>{ this.props.headline }</div><br/>
                    <div className='news-metadata'>{ this.props.source } | { this.props.date }</div><br/>
                    <div className='news-preview'>{ this.props.preview }</div>
                </a>
            </li>
        ); 
    }
});

module.exports = NewsPanelItem;