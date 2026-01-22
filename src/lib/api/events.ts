import type { Event, EventListResponse } from "@/types/events"
import api from "./api"

// export const setHeartToEvent = async ({isHeart}: {isHeart: boolean}) => { 
//     try {
//         const response = await api.post<Event>("/api/event", {isHeart})
//         return response.data
//     } catch (error) {
//         console.error("Failed to set heart to event:", error)
//         return null
//     }
// }
export const createEvent = async (event: FormData) => {
    try {
        const response = await api.post<Event>("/api/event", event)
        return response.data
    } catch (error) {
        console.error("Failed to create event:", error)
        return null
    }
}
export const getEvents = async (page: number, limit: number, query?: string, url?: string) => {
    try {
        const response = await api.get<EventListResponse>(`/api/event/${url ? url : ""}?page=${page}&limit=${limit}${query ? `&query=${query}` : ""}`)
        return response.data
    } catch (error) {
        console.error("Failed to get events by page and limit:", error)
        return null
    }
}
export const getEventCount = async () => {
    try {
        const response = await api.get<{data: number}>("/api/event/all")
        return response.data.data
    } catch (error) {
        console.error("Failed to get event count:", error)
        return null
    }
}

export const getEventCountOnGoing = async () => {
    try {
        const response = await api.get<{data: number}>("/api/event/ongoing")
        return response.data.data
    } catch (error) {
        console.error("Failed to get event count:", error)
        return null
    }
}
export const getEventThisYear = async () => {
    try {
        const response = await api.get<{data: number}>("/api/event")
        return response.data.data
    } catch (error) {
        console.error("Failed to get events by this year:", error)
        return null
    }
}

export const getEventById = async (id: string) => {
    try {
        const response = await api.get<Event>(`/api/event/${id}`)
        return response.data
    } catch (error) {
        console.error("Failed to get event by id:", error)
        return null
    }
}
