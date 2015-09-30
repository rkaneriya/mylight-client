var React = require('react');

var Loading = React.createClass ({
    render: function() {
        return (
            <div className='col-sm-10 col-sm-offset-3 col-md-10 col-md-offset-2 main'>
            	<div>
	               	<img className='loading' src='/images/title-loading.gif' width='100px' alt='Release info loading' /> 
	            </div>         
            </div>
        );
    }
});

module.exports = Loading;