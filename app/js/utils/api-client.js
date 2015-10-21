/* 
	Client-side API client to CRUD releases
*/

var request = require('request'); 
var url = require('../../config/config').API_URL; 

var authenticate = function(username, password_hash, completed, failed) {
    request({ 
        method: 'POST',
        uri: (url + '/auth'),
        json: true,
        body: { 
            username: username, 
            password_hash: password_hash 
        }
    }, function(err, req, body) { 
        if (err) failed(err); 
        else completed(body); 
    }); 
}; 

var load = function(jwt, completed, failed) { 
    request({ 
        method: 'GET', 
        uri: (url + '/load?token=' + jwt)
    }, function(err, req, body) { 
        if (err) failed(err); 
        else completed(JSON.parse(body)); 
    }); 
};

var updatePersonalInfo = function(uid, personal_info, completed, failed) { 
    request({ 
        method: 'PUT',
        uri: (url + '/user/' + uid),
        json: true,
        body: { 
            personal_info: personal_info
        }
    }, function(err, req, body) { 
        if (err) failed(err); 
        else completed(body); 
    }); 
}; 

module.exports = { 
    authenticate: authenticate,
    load: load,
    updatePersonalInfo: updatePersonalInfo
};