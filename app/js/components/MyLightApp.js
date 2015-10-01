var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var parseString = require('xml2js').parseString; 
var http = require('http'); 
var _ = require('underscore'); 
var moment = require('moment'); 

var MAIN_URL = require('../../config/config').MAIN_URL; 

var MyLightApp = React.createClass({
    getInitialState: function() { 
        return { 
            news: []
        }; 
    }, 

    componentWillMount: function() { 
        var url = MAIN_URL + '/news'; 
            
        var xmlToJson = function xmlToJson(url, callback) {
            var req = http.get(url, function(res) {
                var xml = '';

                res.on('data', function(chunk) {
                  xml += chunk;
                });

                res.on('error', function(e) {
                  callback(e, null);
                }); 

                res.on('timeout', function(e) {
                  callback(e, null);
                }); 

                res.on('end', function() {
                  parseString(xml, function(err, result) {
                    callback(null, result);
                  });
                });
            });
        }; 

        var self = this; 
        xmlToJson(url, function(err, data) { 
            if (err) { 
                console.log(err); 
            } else { 
                var raw = data.rss.channel[0].item;
                var news = _.map(raw, function(r) { 
                    return { 
                        headline: r.title[0],
                        source: r['News:Source'][0],
                        preview: r.description[0],
                        link: r.link[0],
                        date: moment(new Date(r.pubDate[0])).format('MMM D, YYYY')
                    };
                });  

                self.setState({ news: news }); 
            }
        }); 
    },

    render: function() {
        return (
            <div>
                <RouteHandler news={ this.state.news }/>
            </div>
        );
    }
});

module.exports = MyLightApp;    