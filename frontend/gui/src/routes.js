import React from 'react';
import {Route} from 'react-router-dom';
import EventList from "./containers/EventList";
import EventDetailView from "./containers/EventDetailView";
import Login from './containers/Login';
import Signup from './containers/Signup';

const BaseRouter = () => (
    <div>
        <Route exact path='/' component={EventList}/>
        <Route exact path='/event/:eventID' component={EventDetailView}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/signup' component={Signup}/>
    </div>
);

export default BaseRouter;