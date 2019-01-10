import {Button, Form, Icon, Input, Select} from 'antd';
import React from 'react';
import axios from "axios";
import PropTypes from "prop-types";
import Loader from "../loader/loader";
import {withRouter} from "react-router-dom";
import DateRange from "./parts/DateRange";
import TimeRange from "./parts/TimeRange";
import Subject from "./parts/Subject";
import {FormLayout} from "./FormLayout";
import {mapDateAndTimeToMoment, mappedDateAndTimeWithValues, TimeFormat} from "../../util/DateTimeUtil";
import {deleteEvent, getEventById} from "../../api/eventRepository";
import moment from "moment";

const {Option} = Select;

class FormEvent extends React.Component {
    static propTypes = {
        requestType: PropTypes.string.isRequired,
        eventID: PropTypes.number,
    };
    state = {
        isLoaded: false,
    };

    componentDidMount() {
        if (this.props.requestType === 'put') {
            getEventById(this.props.location.state.eventId).then(res => {
                const event = res.data;
                const mappedEvent = mapDateAndTimeToMoment(event);
                console.log(mappedEvent)
                this.props.form.setFieldsValue({...mappedEvent});
                const startTime = mappedEvent.startTime;
                const endTime = mappedEvent.endTime;
                const difference = moment(moment.utc(endTime.diff(startTime)).format(TimeFormat), TimeFormat);
                this.props.form.setFieldsValue({
                    duration: difference
                })
            })
            this.setState({
                eventID: this.props.location.state.eventId,
                isLoaded: true
            })
        } else {
            this.setState({
                isLoaded: true
            })
        }
    }

    delete = () => {
        deleteEvent(this.state.eventID).then(res => this.props.history.goBack()).catch(err => console.error(err))
    }


    handleSubmit = (event, requestType, eventID) => {
        event.preventDefault();
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (!err) {
                const preparedValues = mappedDateAndTimeWithValues(fieldsValue);
                const {id, subject, place, startDate, startTime, endDate, endTime, eventType, eventCategory, description} = preparedValues;
                const eventToSave = {
                    id,
                    subject,
                    place,
                    startDate,
                    startTime,
                    endDate,
                    endTime,
                    eventType,
                    eventCategory,
                    description,
                };
                switch (requestType) {
                    case 'put' : {
                        axios.put(`http://127.0.0.1:8000/api/${eventID}/`, eventToSave)
                            .then(res => console.log(res))
                            .catch(error => console.error(error));
                        this.setState({
                            eventID: false,
                        });
                        break
                    }
                    case 'post' : {
                        axios.post('http://127.0.0.1:8000/api/', eventToSave)
                            .then(res => console.log(res))
                            .catch(error => console.error(error));
                        break
                    }
                }
            }
            this.setState({
                isLoaded: false
            });
            this.props.history.goBack();
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const FormHeader = () => {
            return (
                <Form.Item>
                    <h1 className="d-lg-inline-block container-fluid">
                        <Button className="ant-btn-circle-outline float-left" shape="circle" icon="close"
                                onClick={this.props.history.goBack}/>
                        <span
                            className="col-md-4 col-md-offset-3">{this.state.eventID ? 'Update event' : 'Add a new event'}</span>
                        <Button className="btn btn-primary col-md-1" type="primary"
                                htmlType="submit">Save</Button>
                        {this.state.eventID ?
                            <Button className="float-right" icon="delete" onClick={this.delete}/> : null
                        }
                    </h1>
                </Form.Item>
            )
        };

        if (this.state.isLoaded) {
            return (
                <React.Fragment>
                    <Form onSubmit={(event) => this.handleSubmit(event, this.props.requestType, this.state.eventID)}>
                        <FormHeader/>
                        <Subject {...{
                            form: this.props.form,
                        }}/>
                        <Form.Item
                            {...FormLayout}
                            label="Place"
                        >
                            {getFieldDecorator('place', {})(
                                <Input type="text"/>
                            )}
                        </Form.Item>
                        <DateRange {...{
                            form: this.props.form,
                        }}/>
                        <TimeRange {...{
                            form: this.props.form,
                        }}/>
                        <Form.Item
                            {...FormLayout}
                            label="Description"
                        >
                            {getFieldDecorator('description', {})(
                                <Input.TextArea name="description"/>
                            )}
                        </Form.Item>
                        <Form.Item
                            {...FormLayout}
                            label="Event Type"
                        >
                            {getFieldDecorator('eventType', {
                                initialValue: 'Task',
                                rules: [{
                                    required: true, message: 'Please input your the event type',
                                }],
                            })(
                                <Select>
                                    {eventTypeChoices.map(option =>
                                        <Option key={option.value} value={option.value}>{option.label}</Option>
                                    )}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item
                            {...FormLayout}
                            label="Event Category"
                        >
                            {getFieldDecorator('eventCategory', {
                                initialValue: 'Green',
                                rules: [{
                                    required: true, message: 'Please input your the event category',
                                }],
                            })(
                                <Select
                                    style={{color: this.props.form.getFieldValue('eventCategory'), fontWeight: 'bold'}}>
                                    {eventCategoryChoices.map(option =>
                                        <Option key={option.value} value={option.value} style={{
                                            color: option.value,
                                            fontWeight: 'bold'
                                        }}>{option.label}</Option>
                                    )}
                                </Select>
                            )}
                        </Form.Item>
                    </Form>
                </React.Fragment>
            )
        } else {
            return (
                <Loader/>
            )
        }
    }
}


const eventTypeChoices = [
    {
        value: 'Appointment',
        label: 'Appointment',
    },
    {
        value: 'Meeting',
        label: 'Meeting',
    },
    {
        value: 'Task',
        label: 'Task',
    },
    {
        value: 'All_day',
        label: 'All day event',
    },
    {
        value: 'Reccurence_meeting',
        label: 'Recurrence meeting',
    },
];

const eventCategoryChoices = [
    {
        value: 'Red',
        label: 'Red',
    }, {
        value: 'Blue',
        label: 'Blue',
    }, {
        value: 'Green',
        label: 'Green',
    }, {
        value: 'Orange',
        label: 'Orange',
    }, {
        value: 'Yellow',
        label: 'Yellow',
    },
];
const EventForm = Form.create()(FormEvent);
export default withRouter(EventForm);