import React from 'react';
import Events from '../components/Events';
import axios from "axios";

class EventList extends React.Component {
    state = {
        events: []
    };

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/event/')
            .then(res => {
                this.setState({
                    events: res.data
                });
            })
    }

    render() {
        return (
            <Events data = {this.state.events}/>
        )
    }
}

export default EventList;