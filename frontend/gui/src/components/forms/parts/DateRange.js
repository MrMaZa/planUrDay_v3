import {DatePicker, Form} from 'antd';
import React from 'react';
import PropTypes from "prop-types";
import moment from 'moment';
import {formPartRequired} from "./BasePart";
import {DateFormat} from "../../../util/DateTimeUtil";
import {FormLayout} from "../FormLayout";


function DateRange(props) {

    const validateDates = (rule, value, callback) => {
        const form = props.form;
        const startDate = form.getFieldValue('startDate');
        const endDate = form.getFieldValue('endDate');
        if (startDate.isAfter(endDate)) {
            callback("Start date cannot be after end date!")
        } else {
            callback();
        }
    };

    const configDate = {
        initialValue: moment(moment.now()),
        rules: [{type: 'object', required: true, message: 'Please select date!'}]
    };
    const {getFieldDecorator} = props.form;
    return (
        <Form.Item
            label="Date range"
            {...FormLayout}
            style={{marginBottom: 0}}
        >
            {getFieldDecorator('dateRange', {
                rules: [{}, {validator: validateDates},]
            })(
                <>
                    <Form.Item
                        {...FormLayout}
                        style={{display: 'inline-block', width: '20%-12px'}}
                    >
                        {getFieldDecorator('startDate', configDate)(
                            <DatePicker format={DateFormat}/>
                        )}
                    </Form.Item>
                    <span style={{display: 'inline-block', width: '24px', textAlign: 'center'}}>
                                -
                            </span>
                    <Form.Item
                        {...FormLayout}
                        style={{display: 'inline-block', width: '20%-12px'}}
                    >
                        {getFieldDecorator('endDate', configDate)(
                            <DatePicker format={DateFormat}/>
                        )}
                    </Form.Item>
                </>)
            }
        </Form.Item>
    )
}

DateRange.propTypes = {
    ...formPartRequired,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
};

export default DateRange;