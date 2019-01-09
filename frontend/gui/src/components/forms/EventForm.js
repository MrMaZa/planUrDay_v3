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
import {mappedDateAndTimeWithValues} from "../../util/DateTimeUtil";

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
            console.log(this.props.location.state.event);
        }
        this.setState({
            isLoaded: true
        })
    }


    handleSubmit = (event, requestType, eventID) => {
        event.preventDefault();
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (!err) {
                const preparedValues = mappedDateAndTimeWithValues(fieldsValue);
                const {id, subject, place, startDate, startTime, endDate, endTime, eventType, eventCategory, description, userId} = preparedValues;
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
                    userId
                };
                switch (requestType) {
                    case 'put' : {
                        axios.put(`http://127.0.0.1:8000/api/${eventID}/`, eventToSave)
                            .then(res => console.log(res))
                            .catch(error => console.error(error));
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
            this.props.history.goBack();
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const FormHeader = () => {
            return (
                <Form.Item>
                    <h1 className="d-lg-inline-block container-fluid">
                        <Button className="ant-btn-circle btn-outline-primary float-left" htmlType="button"
                                onClick={this.props.history.goBack}><Icon
                            type="close"/></Button>
                        <span
                            className="col-md-4 col-md-offset-3">{this.props.eventID ? 'Update event' : 'Add a new event'}</span>
                        <Button className="btn btn-primary col-md-1" type="primary"
                                htmlType="submit">Save</Button>
                    </h1>
                </Form.Item>
            )
        };

        if (this.state.isLoaded) {
            return (
                <React.Fragment>
                    <Form onSubmit={(event) => this.handleSubmit(event, this.props.requestType, this.props.eventID)}>
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