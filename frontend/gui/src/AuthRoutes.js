import React from 'react';
import {Route, Switch} from 'react-router-dom';
import EventList from "./containers/EventList";
import EventDetailView from "./containers/EventDetailView";
import Login from './containers/Login';
import Signup from './containers/Signup';
import CalendarContainer from './components/CalendarContainer';
import EventForm from "./components/forms/EventForm";

const addEventForm = () => {
    return (
        <EventForm requestType='post'/>
    )
};

const updateEventForm = () => {
    return (
        <EventForm requestType='put'/>
    )
}
const AuthRouter = () => (
    <Switch>
        <Route exact path='/events' component={EventList}/>
        <Route exact path='/add' component={addEventForm}/>
        <Route exact path='/update' component={updateEventForm}/>
        <Route exact path='/event/:eventID' component={EventDetailView}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/signup' component={Signup}/>
        <Route exact path='/home' component={CalendarContainer}/>
    </Switch>
);

export default AuthRouter;
