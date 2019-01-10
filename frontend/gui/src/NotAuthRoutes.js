import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Login from './containers/Login';
import Signup from './containers/Signup';
import WelcomeScreen from "./components/WelcomeScreen";


const NotAuthRouter = () => (
    <Switch>
        <Route exact path='/' component={WelcomeScreen}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/signup' component={Signup}/>
        <Redirect to='/'/>
    </Switch>
);

export default NotAuthRouter;