import axios from "axios/index";
import {serverAddress} from "./config";

export function getAllEvents() {
    return axios.get(`${serverAddress}`)
}

export function getAllEventsByMounth(month) {
    return axios.get(`${serverAddress}/?month=/${month}`)
}

export function getEventById(eventId) {
    return axios.get(`${serverAddress}${eventId}`)
}

export function createEvent(event) {
    return axios.post(`${serverAddress}`, event)
}

export function updateEvent(event) {
    return axios.put(`${serverAddress}${event.id}/`, event)
}

export function deleteEvent(event) {
    return axios.delete(`${serverAddress}${event.id}`)
}