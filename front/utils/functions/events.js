import { fetchWrapper } from "../api/api"


export const getEvents = () => {
    return fetchWrapper({ endpoint: "/events" })
}

export const getEventsById = (id) => {
    return fetchWrapper({ endpoint: `/events/${id}` })
}

export const createEvent = (event, token) => {
    return fetchWrapper({
        endpoint: "/events", 
        method: "POST", 
        body: event, 
        token: token,
        isJson: false
    })
}

export const deleteEvent = async (eventId, token) => {
    return fetchWrapper({
        endpoint: `/events/${eventId}`,
        method: "DELETE",
        token: token
    })
}

