var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var _ = require('underscore'); 

var UserActions = require('../actions/UserActions'); 
var categories = require('../utils/categories').lower; 

var Input = require('react-bootstrap').Input; 
var Button = require('react-bootstrap').Button; 
var Col = require('react-bootstrap').Col; 
var Panel = require('react-bootstrap').Panel; 
var Modal = require('react-bootstrap').Modal; 

var Profile = React.createClass({    
    getInitialState: function() {
        return { 
            showModal: false
        };
    },
    
    openModal: function() { 
        this.setState({ showModal: true });
    },

    closeModal: function() { 
        this.setState({ showModal: false });
        location.reload(); // for new charities to load 
    },

    handleInfoChange: function(prop) { 
        UserActions.updatePersonalInfo(prop, this.refs[prop].getValue()); 
    }, 

    handleCauseChange: function(prop) { 
        UserActions.updatePersonalInfo(prop, this.refs[prop].getChecked());
    }, 

    onSaveChanges: function() { 
        UserActions.savePersonalInfo(this.props.personal_info.uid); 
        this.openModal(); 
        // add "SETTINGS" section to allow for deleting account
        // should send email if one is provided -- saying that you've changed your email address
        // should prevent someone from entering an email address that isn't their own (one that's already been used)
    }, 

    onReset: function() { 
        _.each(_.keys(categories), function(prop, idx, list) { 
            UserActions.updatePersonalInfo(prop, this.refs, false); 
        }); 
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
                    <Input type='checkbox' label={ categories['ar'] } ref='ar' checked={this.props.personal_info.ar} onChange={ this.handleCauseChange.bind(this, 'ar') }/>
                    <Input type='checkbox' label={ categories['ed'] } ref='ed' checked={this.props.personal_info.ed} onChange={ this.handleCauseChange.bind(this, 'ed') }/>
                    <Input type='checkbox' label={ categories['bh'] } ref='bh' checked={this.props.personal_info.bh} onChange={ this.handleCauseChange.bind(this, 'bh') }/>
                    <Input type='checkbox' label={ categories['en'] } ref='en' checked={this.props.personal_info.en} onChange={ this.handleCauseChange.bind(this, 'en') }/>
                </Col>
                <Col xs={4}>
                    <Input type='checkbox' label={ categories['he'] } ref='he' checked={this.props.personal_info.he} onChange={ this.handleCauseChange.bind(this, 'he') }/>
                    <Input type='checkbox' label={ categories['hu'] } ref='hu' checked={this.props.personal_info.hu} onChange={ this.handleCauseChange.bind(this, 'hu') }/>
                    <Input type='checkbox' label={ categories['intl'] } ref='intl' checked={this.props.personal_info.intl} onChange={ this.handleCauseChange.bind(this, 'intl') }/>
                    <Input type='checkbox' label={ categories['mu'] } ref='mu' checked={this.props.personal_info.mu} onChange={ this.handleCauseChange.bind(this, 'mu') }/>
                </Col>
                <Col xs={4}>
                    <Input type='checkbox' label={ categories['pu'] } ref='pu' checked={this.props.personal_info.pu} onChange={ this.handleCauseChange.bind(this, 'pu') }/>
                    <Input type='checkbox' label={ categories['re'] } ref='re' checked={this.props.personal_info.re} onChange={ this.handleCauseChange.bind(this, 're') }/> 
                    <Input type='checkbox' label={ categories['un'] } ref='un' checked={this.props.personal_info.un} onChange={ this.handleCauseChange.bind(this, 'un') }/> 
                </Col>

                <Col xs={8}></Col>
                <Col xs={4}>
                    <Button style={{ margin: '5px', float: 'right' }} onClick={ this.onReset }>Reset</Button>
                    <Button bsStyle='success' style={{ margin: '5px', float: 'right' }} onClick={ this.onSaveChanges }>Save Changes</Button>
                </Col>

                <Col xs={12}>
                    <br/><br/>
                </Col>


                <Modal show={this.state.showModal} onHide={ this.closeModal }>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Preferences Saved  
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>    
                        <div>
                            Your preferences have been saved.  
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button bsStyle='success' onClick={ this.closeModal }>OK</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        ); 
    }
});

module.exports = Profile;