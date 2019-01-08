import React from 'react';
import {NavLink} from "react-router-dom";

class WelcomeScreen extends React.Component {
    render() {
        return (
            <>
                <h1 className="text-center">Welcome to the planUrDay calendar application!</h1>
                <h2 className="text-center">To proceed with usage please
                    <NavLink
                        style={{marginLeft: '10px', marginRight: '10px'}}
                        to='/login'> Login
                    </NavLink>
                    or
                    <NavLink
                        style={{marginRight: '10px'}}
                        to='/signup'> Signup
                    </NavLink>
                </h2>
            </>
        )
    }
}

export default WelcomeScreen;