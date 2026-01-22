import type { Event } from "@/types/events"
import api from "./api"
import { ListResponse } from "@/types/common"
// export const setHeartToEvent = async ({isHeart}: {isHeart: boolean}) => { 
//     try {
//         const response = await api.post<Event>("/api/event", {isHeart})
//         return response.data
//     } catch (error) {
//         console.error("Failed to set heart to event:", error)
//         return null
//     }
// }

const eventsApi = {
    getEvents: async (page?: number, limit?: number, query?: string, url?: string) => {
        try {
            const response = await api.get<ListResponse<Event>>(`/api/event/${url ? url : ""}?page=${page}&limit=${limit}${query ? `&query=${query}` : ""}`)
            return response.data
        } catch (error) {
            console.error("Failed to get events by page and limit:", error)
            return null
        }
    },

    getEventById: async (id: string) => {
        try {
            const response = await api.get<Event>(`/api/event/${id}`)
            return response.data
        } catch (error) {
            console.error("Failed to get event by id:", error)
            return null
        }
    }
}
export default eventsApi
