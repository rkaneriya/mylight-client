var React = require('react');
var Router = require('react-router');
var Route = Router.Route; 
var NotFoundRoute = Router.NotFoundRoute; 
var DefaultRoute = Router.DefaultRoute; 

var MyLightApp = require('./components/MyLightApp'); 
var HomePage = require('./components/HomePage');
var Dashboard = require('./components/Dashboard'); 
var Profile = require('./components/Profile'); 
var CharityList = require('./components/CharityList'); 
var CharityPage = require('./components/CharityPage'); 
var FriendList = require('./components/FriendList'); 
var FriendPage = require('./components/FriendPage'); 

var routes = (
    <Route path='/' handler={ MyLightApp }> 
        <Route path='home' handler={ HomePage }/> 
        <Route path='mylight' handler={ Dashboard }> 
            <Route path='profile' handler={ Profile }/> 
            <Route path='charities' handler={ CharityList }/>
            <Route path='charities/:id' handler={ CharityPage }/>
            <Route path='friends' handler={ FriendList }/>
            <Route path='friends/:id' handler={ FriendPage }/> 
            <DefaultRoute handler={ Profile }/>
        </Route>
        <DefaultRoute handler={ HomePage }/> 
        <NotFoundRoute handler={ HomePage }/>
    </Route>
);

// var routes = (
//     <Route path='/' handler={ HomePage }>
//         <Route path='event' handler={ EventList } />
//         <Route path='event/:id' handler={ EventPage } >
//             <Route path='guest' handler={ GuestList } />
//             <Route path='reports' handler={ Reports } />
//         </Route>
//         <Route path='event/:id/registration' handler={ Registration } />
//         <DefaultRoute handler={ EventList } />
//     </Route>
// );

module.exports = routes;