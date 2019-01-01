import React from 'react';
import {Route} from 'react-router-dom';
import EventList from "./containers/EventList";
import EventDetailView from "./containers/EventDetailView";

const BaseRouter = () => (
    <div>
        <Route exact path='/' component={EventList}/>
        <Route exact path='/:eventID' component={EventDetailView}/>
    </div>
);

export default BaseRouter;