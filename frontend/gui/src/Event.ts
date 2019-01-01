export default interface IEvent {
    id?: number,
    subject?: string,
    place?: string,
    startDateTime?: Date,
    endDateTime?: Date,
    eventType?: string,
    eventCategory?: string,
    description?: string,
}

export default class Event implements IEvent {
    constructor(
        public id?: number,
        public subject?: string,
        public place?: string,
        public startDateTime?: Date,
        public endDateTime?: Date,
        public eventType?: string,
        public eventCategory?: string,
        public description?: string,
    ) {
    }
}