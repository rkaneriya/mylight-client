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

var createNewUser = function(first_name, last_name, email, username, password, completed, failed) { 
    request({ 
        method: 'POST', 
        uri: (url + '/user'),
        json: true,
        body: { 
            first_name: first_name,
            last_name: last_name,
            username: username,
            email: email,
            password_hash: password,
            ar: false,
            bh: false, 
            ed: false, 
            eh: false, 
            en: false,
            he: false,
            hu: false,
            intl: false,
            mu: false,
            pu: false,
            re: false,
            un: false
        }
    }, function(err, req, body) { 
        if (err) failed(err); 
        else completed(body); 
    }); 
}; 

var loadCharity = function(ein, uid, completed, failed) { 
    request({ 
        method: 'GET', 
        uri: (url + '/charity/' + ein + '?uid=' + uid)
    }, function(err, req, body) { 
        if (err) failed(err); 
        else completed(JSON.parse(body)); 
    }); 
}; 

var toggleFavorite = function(uid, ein, completed, failed) { 
    request({ 
        method: 'POST',
        uri: (url + '/user/' + uid + '/favorites'),
        json: true,
        body: { 
            ein: ein
        }
    }, function(err, req, body) { 
        if (err) failed(err); 
        else completed(body); 
    }); 
};

module.exports = { 
    authenticate: authenticate,
    load: load,
    updatePersonalInfo: updatePersonalInfo,
    createNewUser: createNewUser,
    loadCharity: loadCharity,
    toggleFavorite: toggleFavorite
};