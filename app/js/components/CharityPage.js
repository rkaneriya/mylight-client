var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var State = Router.State; 
var RouteHandler = Router.RouteHandler;
var _ = require('underscore'); 
var numeral = require('numeral'); 

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
        CharityActions.loadCharity(_.last(path.split('/'))); 
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

    render: function() {
        if (_.isEmpty(this.state.charity)) { 
            return (
                <img src='/images/facebook.gif' style={{ marginTop: '200px', marginLeft: '400px' }} />
            );             
        } else { 
            var c = this.state.charity;
            var color = colors[c.ntmaj12]; 
            var stats = this.generateStats(); 
            return (
                <div className="col-sm-9 col-md-10 main">
                    <Col xs={12}>
                        <h1>
                            { c.name }
                            <OverlayTrigger placement="right" overlay={<Tooltip>Favorite</Tooltip>}>
                                <span className="favorite glyphicon glyphicon-star" aria-hidden="true"></span>
                            </OverlayTrigger>
                        </h1>
                        { c.address }, { (c.state == 'FO') ? c.city : <span>{ c.city }, { c.state }, { c.zip }, USA </span> } | 
                        <span className='badge' style={{ marginLeft: '10px', backgroundColor: color, color: 'black' }}>{ categories[c.ntmaj12] }</span>
                    </Col>
                    <hr/>
                    <br/><br/>
                    <div className='report'>
                        <Col xs={12}>
                            <i><b><h2>FINANCIAL HEALTH</h2></b></i>
                        </Col>
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
                </div>
            ); 
        }
    }
});

module.exports = CharityPage;