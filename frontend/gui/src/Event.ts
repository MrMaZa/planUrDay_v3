export default interface IEvent {
    id?: number,
    subject?: string,
    place?: string,
    startDate?: Date,
    startTime?: any,
    endDate?: Date,
    endTime?: any,
    eventType?: string,
    eventCategory?: string,
    description?: string,
}

export default class Event implements IEvent {
    constructor(
        public id?: number,
        public subject?: string,
        public place?: string,
        public startDate?: Date,
        public startTime?: any,
        public endDate?: Date,
        public endTime?: any,
        public eventType?: string,
        public eventCategory?: string,
        public description?: string,
    ) {
    }
}