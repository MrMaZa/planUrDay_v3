import React from 'react';
import {Breadcrumb, Layout, Menu} from 'antd';
import {Link, withRouter} from "react-router-dom";
import * as actions from "../store/actions/auth";
import {connect} from 'react-redux';


const {Header, Content, Footer} = Layout;

class CustomLayout extends React.Component {
    render() {
        return (
            <Layout className="layout">
                <Header>
                    <div className="logo"/>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{lineHeight: '64px'}}
                    >
                                <Menu.Item key="1">
                                    <Link to="/login/">Login</Link>
                                </Menu.Item>
                                <Menu.Item key="2" style={{float: 'right'}}>
                                    <Link to="/signup/">Sign up</Link>
                                </Menu.Item>
                    </Menu>
                </Header>
                <Content style={{padding: '0 50px'}}>
                    <div style={{background: '#fff', padding: 24, minHeight: 500}}>{this.props.children}</div>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomLayout));