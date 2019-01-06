import React, {Component} from 'react';
import 'antd/dist/antd.css';
import CustomLayout from './containers/Layout';
import {BrowserRouter as Router} from 'react-router-dom';
import BaseRouter from "./routes";
import {connect} from 'react-redux';
import * as actions from './store/actions/auth';
import './css/app.css';
import LayoutAuth from "./containers/LayoutAuth";

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    chooseLayout() {
        return (
            this.props.isAuthenticated ?
                <LayoutAuth {...this.props}>
                    <BaseRouter/>
                </LayoutAuth>
                :
                <CustomLayout {...this.props}>
                    <BaseRouter/>
                </CustomLayout>
        )
    }

    render() {
        return (
            <div className="App">
                <Router>
                    {this.chooseLayout()}
                </Router>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
