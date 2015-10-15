var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var UserActions = require('../actions/UserActions'); 

var Input = require('react-bootstrap').Input; 
var Button = require('react-bootstrap').Button; 
var Col = require('react-bootstrap').Col; 
var Panel = require('react-bootstrap').Panel; 

var Profile = React.createClass({    
    handleInfoChange: function(prop) { 
        UserActions.updatePersonalInfo(prop, this.refs[prop].getValue()); 
    }, 

    handleCauseChange: function(prop) { 
        UserActions.updatePersonalInfo(prop, this.refs[prop].getChecked());
    }, 

    onSaveChanges: function() { 
        UserActions.savePersonalInfo(this.props.personal_info.uid); 
    }, 

    render: function() {
        return (
            <div className="col-sm-9 col-md-10 main">
                <h1>PROFILE</h1>
                <h3><i>Personal Information</i></h3>
                <form>
                    <Col xs={4}>
                        <Input type='text' label='First Name' ref='first_name' width={300} value={ this.props.personal_info.first_name } onChange={ this.handleInfoChange.bind(this, 'first_name') }/>
                    </Col>
                    <Col xs={4}>
                        <Input type='text' label='Last Name' ref='last_name' width={300} value={ this.props.personal_info.last_name } onChange={ this.handleInfoChange.bind(this, 'last_name') }/>
                    </Col>
                    <Col xs={4}>
                        <Input type='text' label='E-mail Address' ref='email' width={300} value={ this.props.personal_info.email } onChange={ this.handleInfoChange.bind(this, 'email') }/>
                    </Col>
                </form>

                <br/><br/>

                <h3><i>Causes I&#39;m Passionate About:</i></h3>
                <Col xs={4}>
                    <Input type='checkbox' label='Arts/Culture' ref='ar' checked={this.props.personal_info.ar} onChange={ this.handleCauseChange.bind(this, 'ar') }/>
                    <Input type='checkbox' label='K-12 Education' ref='ed' checked={this.props.personal_info.ed} onChange={ this.handleCauseChange.bind(this, 'ed') }/>
                    <Input type='checkbox' label='Higher Education' ref='bh' checked={this.props.personal_info.bh} onChange={ this.handleCauseChange.bind(this, 'bh') }/>
                    <Input type='checkbox' label='Environment' ref='en' checked={this.props.personal_info.en} onChange={ this.handleCauseChange.bind(this, 'en') }/>
                </Col>
                <Col xs={4}>
                    <Input type='checkbox' label='Health/Medicine' ref='he' checked={this.props.personal_info.he} onChange={ this.handleCauseChange.bind(this, 'he') }/>
                    <Input type='checkbox' label='Human Services' ref='hu' checked={this.props.personal_info.hu} onChange={ this.handleCauseChange.bind(this, 'hu') }/>
                    <Input type='checkbox' label='International' ref='intl' checked={this.props.personal_info.intl} onChange={ this.handleCauseChange.bind(this, 'intl') }/>
                    <Input type='checkbox' label='Mutual Benefit' ref='mu' checked={this.props.personal_info.mu} onChange={ this.handleCauseChange.bind(this, 'mu') }/>
                </Col>
                <Col xs={4}>
                    <Input type='checkbox' label='Public/Societal Benefit' ref='pu' checked={this.props.personal_info.pu} onChange={ this.handleCauseChange.bind(this, 'pu') }/>
                    <Input type='checkbox' label='Religion' ref='re' checked={this.props.personal_info.re} onChange={ this.handleCauseChange.bind(this, 're') }/> 
                    <Input type='checkbox' label='Other' ref='un' checked={this.props.personal_info.un} onChange={ this.handleCauseChange.bind(this, 'un') }/> 
                </Col>

                <Col xs={8}></Col>
                <Col xs={4}>
                    <Button style={{ margin: '5px', float: 'right' }}>Reset</Button>
                    <Button bsStyle='success' style={{ margin: '5px', float: 'right' }} onClick={ this.onSaveChanges }>Save Changes</Button>
                </Col>

                <Col xs={12}>
                    <br/><br/>
                    (Also list favorite charities here) 
                </Col>
            </div>
        ); 
    }
});

module.exports = Profile;