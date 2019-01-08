import {Form, TimePicker} from 'antd';
import React from 'react';
import PropTypes from "prop-types";
import moment from 'moment';
import {DateFormat, TimeFormat} from "../../../util/DateTimeUtil";
import {formPartRequired} from "./BasePart";
import {FormLayout} from "../FormLayout";


function TimeRange(props) {
    const handleDurationChange = (value) => {
        let startTime = props.form.getFieldValue('startTime').clone();
        startTime.add(value.hours(), 'hours').add(value.minutes(), 'minutes');
        props.form.setFieldsValue({
            endTime: startTime
        });
    };

    const onStartTimeChange = (value) => {
        const endTime = props.form.getFieldValue('endTime');
        changeDuration(value, endTime);
    };

    const changeDuration = (startTime, endTime) => {
        const difference = moment(moment.utc(endTime.diff(startTime)).format(TimeFormat), TimeFormat);
        props.form.setFieldsValue({
            duration: difference
        })
    };

    const onEndTimeChange = (value) => {
        const startTime = props.form.getFieldValue('startTime');
        changeDuration(startTime, value);
    };

    const validateTime = (rule, value, callback) => {
        const form = props.form;
        const startTime = form.getFieldValue('startTime');
        const endTime = form.getFieldValue('endTime');
        if (startTime.isAfter(endTime)) {
            callback("Start time cannot be after end time!")
        } else {
            callback();
        }
    };
    const hour = moment('01:00', TimeFormat);
    const endTime = {
        initialValue: moment(moment.now()).add(1, 'hour'),
        rules: [{type: 'object', required: true, message: 'Please select time!'}],
    };
    const startTime = {
        initialValue: moment(moment.now()),
        rules: [{type: 'object', required: true, message: 'Please select time!'},]
    };
    const configDuration = {
        initialValue: hour,
        rules: [{type: 'object'}],
    };
    const {getFieldDecorator} = props.form;
    return (
        <>
            <Form.Item
                label="Time range"
                {...FormLayout}
                style={{marginBottom: 0}}
            >
                {getFieldDecorator('timeRange', {
                    rules: [{}, {validator: validateTime},]
                })(
                    <>
                        <Form.Item
                            {...FormLayout}
                            style={{display: 'inline-block', width: '20%-12px'}}
                        >
                            {getFieldDecorator('startTime', startTime)(
                                <TimePicker onChange={(value) => onStartTimeChange(value)} format={TimeFormat} minuteStep={15}/>
                            )}
                        </Form.Item>
                        <span style={{display: 'inline-block', width: '24px', textAlign: 'center'}}>
                            -
                            </span>
                        <Form.Item
                            {...FormLayout}
                            style={{display: 'inline-block', width: '20%-12px'}}
                        >
                            {getFieldDecorator('endTime', endTime)(
                                <TimePicker onChange={(value) => onEndTimeChange(value)} format={TimeFormat} minuteStep={15}/>
                            )}
                        </Form.Item>
                    </>)}
            </Form.Item>
            <Form.Item
                label="Duration"
                {...FormLayout}
            >
                {getFieldDecorator('duration', configDuration)(
                    <TimePicker onChange={handleDurationChange} format={TimeFormat} minuteStep={15}/>
                )}
            </Form.Item>
        </>
    )
}

TimeRange.propTypes = {
    ...formPartRequired,
    startTime: PropTypes.object,
    endTime: PropTypes.object,
};


export default TimeRange;