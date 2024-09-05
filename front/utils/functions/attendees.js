import { fetchWrapper } from "../api/api"


export const getAttendees = () => {
    return fetchWrapper({ endpoint: "/attendees" })
}

export const getAttendeeById = async (email) => {
    const res = await fetchWrapper({ endpoint: `/attendees/${email}` })
    const data = res.json()
    return data
}

export const confirmAttendance = (eventId, token) => {
    return fetchWrapper({
        endpoint: `/attendees/${eventId}`, 
        method: "POST",
        token: token
    })
}

export const removeAttendance = (eventId, token) => {
    return fetchWrapper({
        endpoint: `/attendees/${eventId}`,
        method: "DELETE",
        token: token
    })
}