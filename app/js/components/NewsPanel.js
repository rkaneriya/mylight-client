var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var NewsPanelItem = require('./NewsPanelItem'); 

var NewsPanel = React.createClass({
    render: function() {
        return (
            <div className="col-sm-3 col-md-2 sidebar">
                <h4>In the news:</h4>
                <ul className="nav nav-sidebar">
                    <NewsPanelItem headline='GiveWell Donates $1000' source='New York Times' date='Sept 1, 2015' preview='Description of GiveWell news article with some more text at the end'/>
                    <NewsPanelItem headline='Water Found on Mars' source='Washington Post' date='Sept 1, 2015' preview='Description of WashPo article'/>
                    <NewsPanelItem headline='GiveWell Donates $1000' source='New York Times' date='Sept 1, 2015' preview='Description of GiveWell news article with some more text at the end'/>
                    <NewsPanelItem headline='Water Found on Mars' source='Washington Post' date='Sept 1, 2015' preview='Description of WashPo article'/>
                    <NewsPanelItem headline='GiveWell Donates $1000' source='New York Times' date='Sept 1, 2015' preview='Description of GiveWell news article with some more text at the end'/>
                    <NewsPanelItem headline='Water Found on Mars' source='Washington Post' date='Sept 1, 2015' preview='Description of WashPo article'/>
                    <NewsPanelItem headline='GiveWell Donates $1000' source='New York Times' date='Sept 1, 2015' preview='Description of GiveWell news article with some more text at the end'/>
                    <NewsPanelItem headline='Water Found on Mars' source='Washington Post' date='Sept 1, 2015' preview='Description of WashPo article'/>
                </ul>
            </div>
        ); 
    }
});

module.exports = NewsPanel;