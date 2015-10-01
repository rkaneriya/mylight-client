var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var _ = require('underscore'); 

var NewsPanelItem = require('./NewsPanelItem'); 

var NewsPanel = React.createClass({
    insertNewsItems: function() { 
        return _.map(this.props.news, function(n, i) { 
            return (<NewsPanelItem key={i} headline={n.headline} source={n.source} date={n.date} preview={n.preview} link={n.link} />); 
        }); 
    }, 

    render: function() {
        return (
            <div className="col-sm-3 col-md-2 sidebar">
                <h4>In the news:</h4>
                <ul className="nav nav-sidebar">
                    { this.insertNewsItems() }
                </ul>
            </div>
        ); 
    }
});

module.exports = NewsPanel;

/* 
<NewsPanelItem headline='GiveWell Donates $1000' source='New York Times' date='Sept 1, 2015' preview='Description of GiveWell news article with some more text at the end'/>
<NewsPanelItem headline='Water Found on Mars' source='Washington Post' date='Sept 1, 2015' preview='Description of WashPo article'/>
<NewsPanelItem headline='GiveWell Donates $1000' source='New York Times' date='Sept 1, 2015' preview='Description of GiveWell news article with some more text at the end'/>
<NewsPanelItem headline='Water Found on Mars' source='Washington Post' date='Sept 1, 2015' preview='Description of WashPo article'/>
<NewsPanelItem headline='GiveWell Donates $1000' source='New York Times' date='Sept 1, 2015' preview='Description of GiveWell news article with some more text at the end'/>
<NewsPanelItem headline='Water Found on Mars' source='Washington Post' date='Sept 1, 2015' preview='Description of WashPo article'/>
<NewsPanelItem headline='GiveWell Donates $1000' source='New York Times' date='Sept 1, 2015' preview='Description of GiveWell news article with some more text at the end'/>
<NewsPanelItem headline='Water Found on Mars' source='Washington Post' date='Sept 1, 2015' preview='Description of WashPo article'/>
*/