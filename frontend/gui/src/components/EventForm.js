import {Button, DatePicker, Form, Input, Select, TimePicker} from 'antd';
import React from 'react';
import axios from "axios";
import PropTypes from "prop-types";
import moment from 'moment';

const {Option} = Select;

const DateFormat = 'YYYY-MM-DD';
const TimeFormat = 'HH:mm';

const mappedDateAndTimeWithValues = (values) => {
    return {
        ...values,
        'startDate': values['startDate'].format(DateFormat),
        'endDate': values['endDate'].format(DateFormat),
        'startTime': values['startTime'].format(TimeFormat),
        'endTime': values['endTime'].format(TimeFormat),
    }
};

class EventForm extends React.Component {
    static propTypes = {
        requestType: PropTypes.string.isRequired,
        eventID: PropTypes.number,
    };

    componentDidMount() {
        if (this.props.requestType === 'put') {
            axios.get(`http://127.0.0.1:8000/api/${this.props.eventID}`).then(res => {
                this.props.form.setFieldsValue(res)
            }).catch(error => console.error(error));
        }
    }

    handleSubmit = (event, requestType, eventID) => {
        event.preventDefault();
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (!err) {
                console.log('Received values of form: ', fieldsValue);
            }
            const values = mappedDateAndTimeWithValues(fieldsValue);
            console.log('Received values of form: ', values);
        });
        const preparedValues = mappedDateAndTimeWithValues(this.props.form.getFieldsValue());
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
        const json = JSON.stringify(eventToSave);
        console.log('json:', json);
        switch (requestType) {
            case 'put' : {
                axios.put(`http://127.0.0.1:8000/api/${eventID}/`, {
                    body: json.valueOf()
                }).then(res => console.log(res)).catch(error => console.error(error));
                break
            }
            case 'post' : {
                axios.post('http://127.0.0.1:8000/api/', eventToSave, {headers: new Headers({"Content-Type": "application/json"})}).then(res => console.log(res)).catch(error => console.error(error));
                break
            }
        }
    };

    render() {
        const configDate = {
            initialValue: moment(moment.now()),
            rules: [{type: 'object', required: true, message: 'Please select date!'}],
        };
        const configTime = {
            initialValue: moment(moment.now()),
            rules: [{type: 'object', required: true, message: 'Please select time!'}],
        };
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <Form onSubmit={(event) => this.handleSubmit(event, this.props.requestType, this.props.eventID)}>
                <Form.Item
                    {...formItemLayout}
                    label="Subject"
                >
                    {getFieldDecorator('subject', {
                        rules: [{
                            required: true, message: 'Please input your the subject',
                        }],
                    })(
                        <Input type="text"/>
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="Place"
                >
                    {getFieldDecorator('place', {})(
                        <Input type="text"/>
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="Start Date"
                >
                    {getFieldDecorator('startDate', configDate)(
                        <DatePicker format={DateFormat}/>
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="End Date"
                >
                    {getFieldDecorator('endDate', configDate)(
                        <DatePicker format={DateFormat}/>
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="Start Time"
                >
                    {getFieldDecorator('startTime', configTime)(
                        <TimePicker format={TimeFormat} minuteStep={15}/>
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="End Time"
                >
                    {getFieldDecorator('endTime', configTime)(
                        <TimePicker format={TimeFormat} minuteStep={15}/>
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="Description"
                >
                    {getFieldDecorator('description', {})(
                        <Input.TextArea name="description"/>
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
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
                    {...formItemLayout}
                    label="Event Category"
                >
                    {getFieldDecorator('eventCategory', {
                        initialValue: 'Green',
                        rules: [{
                            required: true, message: 'Please input your the event category',
                        }],
                    })(
                        <Select>
                            {eventCategoryChoices.map(option =>
                                <Option key={option.value} value={option.value}>{option.label}</Option>
                            )}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        );
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
        label: 'Red category',
    }, {
        value: 'Blue',
        label: 'Blue category',
    }, {
        value: 'Green',
        label: 'Green category',
    }, {
        value: 'Orange',
        label: 'Orange category',
    }, {
        value: 'Yellow',
        label: 'Yellow category',
    },
];

export default EventForm;