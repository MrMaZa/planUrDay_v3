import React from 'react';
import axios from "axios";
import {Card} from 'antd';

class EventDetailView extends React.Component {
    state = {
        event: {}
    };

    componentDidMount() {
        const eventID = this.props.match.params.eventID;
        axios.get(`http://127.0.0.1:8000/api/event/form/${eventID}`)
            .then(res => {
                this.setState({
                    event: res.data
                });
            })
    }

    render() {
        return (
            <Card title={this.state.event.subject}>

            </Card>
        )
    }
}

export default EventDetailView;