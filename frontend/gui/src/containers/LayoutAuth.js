import React from 'react';
import {Breadcrumb, Layout, Menu} from 'antd';
import {Link, withRouter} from "react-router-dom";
import * as actions from "../store/actions/auth";
import {connect} from 'react-redux';


const {Header, Content, Footer} = Layout;

class LayoutAuth extends React.Component {
    componentDidMount() {
        this.props.history.push("/calendar");
    }

    render() {
        return (
            <Layout className="layout">
                <Header>
                    <div className="logo"/>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['4']}
                        style={{lineHeight: '64px'}}
                    >
                            <Menu.Item key="1">
                                <Link to="/add/">Add</Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to="/home/">Home</Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to="/today/">Today</Link>
                            </Menu.Item>
                            <Menu.Item key="4" style={{float: 'right'}}>
                                <Link to="/login" onClick={this.props.logout}>Log out</Link>
                            </Menu.Item>
                    </Menu>
                </Header>
                <Content style={{padding: '0 50px'}}>
                    <div style={{background: '#fff', padding: 24, minHeight: 500}}>{this.props.children}</div>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    Welcome user!
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LayoutAuth));