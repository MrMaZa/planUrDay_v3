import React from 'react';
import {Badge, Calendar} from 'antd'
import '../css/calendar-container.css'
import axios from 'axios'
import Loader from '../components/loader/loader'
import {serverAdress} from '../api/config'





function getMonthData(value) {
    if (value.month() === 8) {
        return 1394;
    }
}

function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
        <div className="notes-month">
            <section>{num}</section>
            <span>Backlog number</span>
        </div>
    ) : null;
}

class CalendarContainer extends React.Component {

    state = {
        events: [],
        isLoaded: false
    }

    monthCellRender = (value, model) => {


    }
    onPanelChange = (value, model) => {

    }
    onSelect = (value, model) => {


    }

    splitDate(date) {
        return date.split('-')[2]
    }

    getListData(value){
        let listData;
    
        console.log(+this.splitDate(this.state.events[0].startDate))

        if (value.date() === +this.splitDate(this.state.events[0].startDate)) {
            return [
                            {type: 'success', content: this.state.events[0].description},
                        ]
        }
        // switch (value.date()) {
    
        //     case 8:
        //         listData = [
        //             {type: 'warning', content: 'This is warning event.'},
        //             {type: 'success', content: 'This is usual event.'},
        //         ];
        //         break;
        //     case 10:
        //         listData = [
        //             {type: 'warning', content: 'This is warning event.'},
        //             {type: 'success', content: 'This is usual event.'},
        //             {type: 'error', content: 'This is error event.'},
        //         ];
        //         break;
        //     case 15:
        //         listData = [
        //             {type: 'warning', content: 'This is warning event'},
        //             {type: 'success', content: 'This is very long usual event。。....'},
        //             {type: 'error', content: 'This is error event 1.'},
        //             {type: 'error', content: 'This is error event 2.'},
        //             {type: 'error', content: 'This is error event 3.'},
        //             {type: 'error', content: 'This is error event 4.'},
        //         ];
        //         break;
        //     default:
        // }
        // let data = {
        //     month: 8,
        //     listData
        // }
    
    
        return  [];
    }

    dateCellRender = (currentCellMonth) => {
        const listData = this.getListData(currentCellMonth);
        return (
            <ul className="events">
                {
                    listData.map(item => (
                        <li key={item.content}>
                            <Badge status={item.type} text={item.content}/>
                        </li>
                    ))
                }
            </ul>
        );
    }

    componentDidMount() {
        axios.get(serverAdress)
            .then(res => {
                console.log(res)
                this.setState({
                    events: res.data,
                    isLoaded: true
                });
            })
    }

    


    render() {
        if (this.state.isLoaded) {
            return (
                <div>
                    <h1 className='yuri-calendar'> Yuriialendar</h1>
                    <Calendar dateCellRender={this.dateCellRender}
                              monthCellRender={monthCellRender}
                              onPanelChange={this.onPanelChange}
                              onSelect={this.onSelect}>
                    </Calendar>
                </div>
            )
        } else {
            return (
                <Loader></Loader>
            )
        }
    }
}

export default CalendarContainer;