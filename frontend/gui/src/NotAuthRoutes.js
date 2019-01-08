import React from 'react';
import {Route} from 'react-router-dom';
import Login from './containers/Login';
import Signup from './containers/Signup';
import WelcomeScreen from "./components/WelcomeScreen";


const NotAuthRouter = () => (
    <div>
        <Route exact path='/' component={WelcomeScreen}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/signup' component={Signup}/>
    </div>
);

export default NotAuthRouter;