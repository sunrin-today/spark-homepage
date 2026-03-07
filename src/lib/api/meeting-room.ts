import { ListResponse } from "@/types/common";
import api from "./api"
import { MeetingRoomRequest, MeetingRoomRequestPost } from "@/types/meeting-room";

const meetingRoomApi = {
    getMeetingRoomSchedule: async ({month, limit = 10, page = 1}: {month?: number, limit?: number, page?: number}) => {
        const response = await api.get<ListResponse<MeetingRoomRequest>>("/api/meeting-room/approved", {
            params: {
                month,
                limit,
                page
            }
        });
        return response;
    },
    postMeetingRoomRequest: async (data : MeetingRoomRequestPost) => {
        const response = await api.post("/api/meeting-room/me", data);
        return response;
    },
}

export default meetingRoomApi