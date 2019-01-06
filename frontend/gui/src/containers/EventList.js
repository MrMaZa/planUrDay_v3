import React from 'react';
import Events from '../components/Events';
import {Form} from 'antd';
import axios from "axios";
import EventForm from "../components/EventForm";
import {connect} from "react-redux";

const CreateEventForm = Form.create()(EventForm);

class EventList extends React.Component {
    state = {
        events: []
    };

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/')
            .then(res => {
                this.setState({
                    events: res.data
                });
            })
    }


    render() {
        return (
            <div>
                <Events data={this.state.events}/>
                <h2>Create an event</h2>
                <CreateEventForm requestType='post'/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
};

export default connect(mapStateToProps)(EventList);