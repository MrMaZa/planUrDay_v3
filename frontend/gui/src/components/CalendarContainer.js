import React from 'react';
import '../css/calendar-container.css'
import Loader from '../components/loader/loader'
import moment from "moment";
import {DateFormat, TimeFormat} from "../util/DateTimeUtil";
import FullCalendar from "fullcalendar-reactwrapper";
import '../css/fullcalendar.css';
import {getAllEvents, updateEvent} from "../api/eventRepository";
import {Redirect, withRouter} from "react-router-dom";


function mapToComponentDataStructure(event) {
    const startDate = moment(event.startDate).format(DateFormat);
    const endDate = moment(event.endDate).format(DateFormat);
    const startTime = moment(event.startTime, TimeFormat).format(TimeFormat);
    const endTime = moment(event.endTime, TimeFormat).format(TimeFormat);
    const start = moment(startDate + ' ' + startTime, 'YYYY-MM-DD HH:mm');
    const end = moment(endDate + ' ' + endTime, 'YYYY-MM-DD HH:mm');
    const mappedEvent = {
        id: event.id,
        title: event.subject,
        allDay: event.eventType === 'All_day',
        color: event.eventCategory,
        textColor: event.eventCategory === 'Yellow' ? 'black' : 'white',
        start: start,
        end: end,
        place: event.place,
        eventType: event.eventType,
        eventCategory: event.eventCategory,
        description: event.description
    };
    return mappedEvent;
}

function mapToOriginalDataStructure(event) {
    const {id, title, start, end, place, description, eventType, eventCategory} = event;
    const startDate = start.format(DateFormat);
    const endDate = end.format(DateFormat);
    const startTime = start.format(TimeFormat);
    const endTime = end.format(TimeFormat);
    const mappedEvent = {
        id: id,
        subject: title,
        place: place,
        startDate: startDate,
        endDate: endDate,
        startTime: startTime,
        endTime: endTime,
        description: description,
        eventType: eventType,
        eventCategory: eventCategory
    };
    return mappedEvent;
}


class CalendarContainer extends React.Component {

    state = {
        events: [],
        isLoaded: false,
        eventId: null,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setState({
            eventId: null
        });
        getAllEvents()
            .then(res => {
                const mappedEvents = res.data.map(event => mapToComponentDataStructure(event));
                this.setState({
                    events: mappedEvents,
                    isLoaded: true
                });
            })
    }

    updateEvent(event, revertFunc) {
        const mappedEvent = mapToOriginalDataStructure(event);
        updateEvent(mappedEvent)
            .then(res => console.log(res))
            .catch(error => {
                console.error(error);
                revertFunc()
            });
    }

    onEventDrop(event, revertFunc) {
        if (event.end === null) {
            event.end = moment(event.start.clone().format(DateFormat), DateFormat)
        }
        this.updateEvent(event, revertFunc)
    }

    onEventResize(event, duration, revertFunc) {
        this.updateEvent(event, revertFunc)
    }

    render() {
        if (this.state.eventId) {
            console.log('inside redirection')
            return <Redirect to={{pathName: "/update", state: {event: this.state.eventId}}}/>
        } else if (this.state.isLoaded) {
            return (
                <div>
                    <FullCalendar
                        header={{
                            left: 'prev, next today',
                            center: 'title',
                            right: 'month,agendaWeek,agendaDay'
                        }}
                        views={{
                            ...{
                                basicDay: {
                                    type: 'agenda',
                                },
                                basicWeek: {
                                    type: 'agenda',
                                },
                            }
                        }}
                        themeSystem='bootstrap4'
                        contentHeight={850}
                        defaultDate={moment.now()}
                        navLinks={true}
                        editable={true}
                        eventDurationEditable={true}
                        eventLimit={true}
                        events={{
                            ...{
                                events: this.state.events,
                                height: 500,
                                timeFormat: 'HH:mm',
                                eventLimit: true,
                                editable: true,
                                droppable: true,
                                resizable: true,
                                eventDurationEditable: true,
                                dragScroll: true,
                            }
                        }}
                        eventResize={(event, duration, revertFunc) => this.onEventResize(event, duration, revertFunc)}
                        eventDrop={(event, delta, revertFunc) => this.onEventDrop(event, revertFunc)}
                        onSelect={(event) => console.log(event)}
                        eventClick={(event) => {
                            console.log('here we are');
                            this.setState({eventId: event.id})
                        }}
                    />
                </div>
            )
        } else {
            return (
                <Loader></Loader>
            )
        }
    }
}

export default withRouter(CalendarContainer);