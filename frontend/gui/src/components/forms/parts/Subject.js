import {Form, Input} from 'antd';
import React from 'react';
import PropTypes from "prop-types";
import {formPartRequired} from "./BasePart";
import {FormLayout} from "../FormLayout";


function Subject (props) {
    const {getFieldDecorator} = props.form;
    return (
        <Form.Item
            {...FormLayout}
            label="Subject"
        >
            {getFieldDecorator('subject', {
                rules: [{
                    required: true, message: 'Please input your the subject', whitespace: true
                }],
            })(
                <Input type="text"/>
            )}
        </Form.Item>
    )
}

Subject.propTypes = {
    ...formPartRequired,
    subject: PropTypes.string,
};

export default Subject;