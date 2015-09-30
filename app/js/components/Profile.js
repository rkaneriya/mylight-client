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
            first_name: 'Rishi',
            last_name: 'Kaneriya',
            email: 'kaneriya@princeton.edu'
        };
    }, 

    handleChange: function(prop) { 
        var change = {}; 
        change[prop] = this.refs[prop].getValue(); 
        this.setState(change); 
    }, 

    render: function() {
        return (
            <div className="col-sm-9 col-md-10 main">
                <h1>PROFILE</h1>
                <h3><i>Personal Information</i></h3>
                <form>
                    <Col xs={4}>
                        <Input type='text' label='First Name' ref='first_name' width={300} value={ this.state.first_name } onChange={ this.handleChange.bind(this, 'first_name') }/>
                    </Col>
                    <Col xs={4}>
                        <Input type='text' label='Last Name' ref='last_name' width={300} value={ this.state.last_name } onChange={ this.handleChange.bind(this, 'last_name') }/>
                    </Col>
                    <Col xs={4}>
                        <Input type='text' label='E-mail Address' ref='email' width={300} value={ this.state.email } onChange={ this.handleChange.bind(this, 'email') }/>
                    </Col>
                </form>

                <br/><br/>

                <h3><i>Causes I&#39;m Passionate About:</i></h3>
                <Col xs={4}>
                    <Input type='checkbox' label='Arts/Culture' ref='arts' />
                    <Input type='checkbox' label='Education' ref='education' />
                    <Input type='checkbox' label='Environment' ref='environment' />
                </Col>
                <Col xs={4}>
                    <Input type='checkbox' label='Animal Rights' ref='animals' />
                    <Input type='checkbox' label='Health/Medicine' ref='health' />
                    <Input type='checkbox' label='Crime' ref='crime' />
                </Col>
                <Col xs={4}>
                    <Input type='checkbox' label='Food/Agriculture' ref='food' />
                    <Input type='checkbox' label='Housing' ref='housing' />
                    <Input type='checkbox' label='Youth Development' ref='youth' />
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