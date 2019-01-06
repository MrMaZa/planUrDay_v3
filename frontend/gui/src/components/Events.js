import React from 'react';
import {List} from 'antd';
import PropTypes from "prop-types";
import Event from "./Event";
import IEvent from "../Event.ts";

const Events = (props) => {
    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                pageSize: 3,
            }}
            dataSource={props.data}
            renderItem={item => (
                <List.Item key={item.id}>
                    <Event item={item}/>
                </List.Item>
            )}
        />
    )
};

Events.propTypes = {
    data: PropTypes.arrayOf(IEvent)
};

export default Events;