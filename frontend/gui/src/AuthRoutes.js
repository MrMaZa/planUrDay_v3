import React from 'react';
import {Route} from 'react-router-dom';
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
const AuthRouter = () => (
    <div>
        <Route exact path='/events' component={EventList}/>
        <Route exact path='/add' component={addEventForm}/>
        <Route exact path='/event/:eventID' component={EventDetailView}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/signup' component={Signup}/>
        <Route exact path='/home' component={CalendarContainer}/>
    </div>
);

export default AuthRouter;
