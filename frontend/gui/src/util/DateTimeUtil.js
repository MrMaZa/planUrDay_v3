import moment from "moment/moment";

export const DateFormat = 'YYYY-MM-DD';
export const TimeFormat = 'HH:mm';


export const mappedDateAndTimeWithValues = (values) => {
    return {
        ...values,
        'startDate': values['startDate'].format(DateFormat),
        'endDate': values['endDate'].format(DateFormat),
        'startTime': values['startTime'].format(TimeFormat),
        'endTime': values['endTime'].format(TimeFormat),
    }
};

export const mapDateAndTimeToMoment = (event) => {
    return {
        ...event,
        startDate: moment(event.startDate, DateFormat),
        endDate: moment(event.endDate, DateFormat),
        startTime: moment(event.startTime, TimeFormat),
        endTime: moment(event.endTime, TimeFormat),
    }
};