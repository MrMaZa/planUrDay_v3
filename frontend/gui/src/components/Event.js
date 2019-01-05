import React from 'react';
import {DatePicker} from 'antd';
import moment from 'moment';
import IEvent from '../Event.ts';


const H3 = ({display}) => {
    return <h3>{display}</h3>
};

const dateFormat = 'YYYY/MM/DD';


const Event = ({item}) => {
    console.log(item.startDateTime);
    return (
        <div>
            <h1>Subject</h1>
            <a href={`/${item.id}`}>{item.subject}</a>
            <H3 display={'Place'}/>
            <H3 display={item.place}/>
            <H3 display={'Start date'}/>
            <DatePicker defaultValue={moment(item.startDateTime, dateFormat)} format={dateFormat} disabled={true}/>
            <H3 display={'End date'}/>
            <DatePicker defaultValue={moment(item.endDateTime, dateFormat)} format={dateFormat} disabled={true}/>
            <H3 display={'Description of the event'}/>
            <H3 display={item.description}/>
        </div>
    )
};

Event.propTypes = {
    item: IEvent
};

export default Event;
