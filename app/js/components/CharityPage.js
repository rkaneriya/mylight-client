var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var State = Router.State; 
var RouteHandler = Router.RouteHandler;
var _ = require('underscore'); 
var numeral = require('numeral'); 

var UserActions = require('../actions/UserActions'); 
var CharityActions = require('../actions/CharityActions'); 
var CharityStore = require('../stores/CharityStore'); 

var Tooltip = require('react-bootstrap').Tooltip; 
var OverlayTrigger = require('react-bootstrap').OverlayTrigger; 
var Col = require('react-bootstrap').Col; 
var Chart = require('react-google-charts').Chart; 

var categories = require('../utils/categories').upper; 
var colors = require('../utils/categories').color;

var CharityPage = React.createClass({
    mixins: [Reflux.connect(CharityStore), State],

    componentWillMount: function() { 
        var path = this.getPath(); 
        var ein = _.first(_.last(path.split('/')).split('?'));
        var uid = _.last(path.split('='));
        CharityActions.loadCharity(ein, uid);  
    },

    generateStats: function() { 
        var c = this.state.charity; 

        var options = {
            title: "",
            legend: { position: "none" },
        };

        var boy = [
            ['Metric', 'Value', { role: 'style' }],
            ['Assets', c.ass_boy, 'orange'],   
            ['Liabilities', c.liab_boy, 'green'],
        ];

        var eoy = [
            ['Metric', 'Value', { role: 'style' }],
            ['Assets', c.ass_eoy, 'orange'],
            ['Liabilities', c.liab_eoy, 'green'],
        ];

        return { 
            boy: boy,
            eoy: eoy,
            options: options
        };
    },  

    toggleFavorite: function() { 
        var path = this.getPath(); 
        var uid = _.last(path.split('='));
        UserActions.toggleFavorite(uid, this.state.charity.ein); 
    }, 

    insertComments: function() { 
        var path = this.getPath(); 
        var ein = _.first(_.last(path.split('/')).split('?'));

        var disqus_config = function () {
            // this.page.url = this.getPath(); // Replace PAGE_URL with your page's canonical URL variable
            this.page.identifier = ein; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
        };

        var d = document; 
        var s = d.createElement('script');

        s.src = '//mylightapp.disqus.com/embed.js';

        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    },

    render: function() {
        if (_.isEmpty(this.state.charity)) { 
            return (
                <img src='/images/facebook.gif' style={{ marginTop: '200px', marginLeft: '400px' }} />
            );             
        } else { 
            var c = this.state.charity;
            console.log(c); 
            var color = colors[c.ntmaj12]; 
            var stats = this.generateStats(); 
            return (
                <div className="col-sm-9 col-md-10 main">
                    <Col xs={12}>
                        <h1>
                            { c.name }
                            <OverlayTrigger placement="right" overlay={<Tooltip>Favorite</Tooltip>}>
                                {
                                    (c.favorite) ?  
                                    <span onClick={ this.toggleFavorite() } className="favorite-yes glyphicon glyphicon-star" aria-hidden="true"></span> :
                                    <span onClick={ this.toggleFavorite() } className="favorite-no glyphicon glyphicon-star" aria-hidden="true"></span>
                                }
                            </OverlayTrigger>
                        </h1>
                        { c.address }, { (c.state == 'FO') ? c.city : <span>{ c.city }, { c.state }, { c.zip }, USA </span> } | 
                        <span className='badge' style={{ marginLeft: '10px', backgroundColor: color, color: 'black' }}>{ categories[c.ntmaj12] }</span>
                        <hr/>
                    </Col>
                    <br/><br/>
                    <div className='report'>
                        <Col xs={6}>
                            <h1 style={{ color: 'green' }}>{ numeral(c.totrev).format('$0,0') }</h1>
                            <h3>Total Revenue</h3>
                            <h5>({ c.fisyr } fiscal year)</h5>
                        </Col>
                        <Col xs={6}>
                            <h1 style={{ color: 'red' }}>{ numeral(c.exps).format('$0,0') }</h1>
                            <h3>Total Expenses</h3>
                            <h5>({ c.fisyr } fiscal year)</h5>
                        </Col>
                        <Col xs={6}>
                            <Chart 
                                chartType="BarChart" 
                                data={stats.boy} 
                                options={stats.options}
                                graph_id="boy" 
                                width={"100%"} 
                                height={"300px"}/>
                            <h3>BOY Balances</h3>
                            <h5>({ c.fisyr })</h5>
                        </Col>
                        <Col xs={6}>
                            <Chart 
                                chartType="BarChart" 
                                data={stats.eoy} 
                                options={stats.options}
                                graph_id="eod" 
                                width={"100%"} 
                                height={"300px"}/>
                            <h3>EOY Balances</h3>
                            <h5>({ c.fisyr })</h5>
                        </Col>
                    </div>
                    <Col xs={12}>
                        <div id="disqus_thread"></div>             
                        { this.insertComments() }
                    </Col>
                </div>
            ); 
        }
    }
});

module.exports = CharityPage;