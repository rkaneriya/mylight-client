var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Input = require('react-bootstrap').Input; 
var Button = require('react-bootstrap').Button; 
var Col = require('react-bootstrap').Col; 
var Panel = require('react-bootstrap').Panel; 

var Profile = React.createClass({    
    getInitialState: function() { 
        return { 
            first_name: 'My',
            last_name: 'Light',
            email: 'mylight@mylight.com'
        };
    }, 

    handleChange: function(prop) { 
        var change = {}; 
        change[prop] = this.refs[prop].getValue(); 
        this.setState(change); 
    }, 

    render: function() {
        console.log(this.props); 
        return (
            <div className="col-sm-9 col-md-10 main">
                <h1>PROFILE</h1>
                <h3><i>Personal Information</i></h3>
                <form>
                    <Col xs={4}>
                        <Input type='text' label='First Name' ref='first_name' width={300} value={ this.props.personal_info.first_name } onChange={ this.handleChange.bind(this, 'first_name') }/>
                    </Col>
                    <Col xs={4}>
                        <Input type='text' label='Last Name' ref='last_name' width={300} value={ this.props.personal_info.last_name } onChange={ this.handleChange.bind(this, 'last_name') }/>
                    </Col>
                    <Col xs={4}>
                        <Input type='text' label='E-mail Address' ref='email' width={300} value={ this.props.personal_info.email } onChange={ this.handleChange.bind(this, 'email') }/>
                    </Col>
                </form>

                <br/><br/>

                <h3><i>Causes I&#39;m Passionate About:</i></h3>
                <Col xs={4}>
                    <Input type='checkbox' label='Arts/Culture' ref='ar' defaultChecked={this.props.personal_info.ar}/>
                    <Input type='checkbox' label='K-12 Education' ref='ed' defaultChecked={this.props.personal_info.ed}/>
                    <Input type='checkbox' label='Higher Education' ref='bh' defaultChecked={this.props.personal_info.bh}/>
                    <Input type='checkbox' label='Environment' ref='en'defaultChecked={this.props.personal_info.en} />
                </Col>
                <Col xs={4}>
                    <Input type='checkbox' label='Health/Medicine' ref='he' defaultChecked={this.props.personal_info.he}/>
                    <Input type='checkbox' label='Human Services' ref='hu' defaultChecked={this.props.personal_info.hu}/>
                    <Input type='checkbox' label='International' ref='intl' defaultChecked={this.props.personal_info.intl}/>
                    <Input type='checkbox' label='Mutual Benefit' ref='mu' defaultChecked={this.props.personal_info.mu}/>
                </Col>
                <Col xs={4}>
                    <Input type='checkbox' label='Public/Societal Benefit' ref='pu' defaultChecked={this.props.personal_info.pu}/>
                    <Input type='checkbox' label='Religion' ref='re' defaultChecked={this.props.personal_info.re}/> 
                    <Input type='checkbox' label='Other' ref='un' defaultChecked={this.props.personal_info.un} /> 
                </Col>

                <Col xs={8}></Col>
                <Col xs={4}>
                    <Button style={{ margin: '5px', float: 'right' }}>Reset</Button>
                    <Button bsStyle='success' style={{ margin: '5px', float: 'right' }}>Save Changes</Button>
                </Col>
            </div>
        ); 
    }
});

module.exports = Profile;