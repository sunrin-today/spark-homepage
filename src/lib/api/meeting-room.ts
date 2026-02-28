import { ListResponse } from "@/types/common";
import api from "./api"
import { MeetingRoomRequest, MeetingRoomRequestPost } from "@/types/meeting-room";

const meetingRoomApi = {
    getMeetingRoomSchedule: async ({month, limit = 10}: {month?: number, limit?: number}) => {
        const response = await api.get<ListResponse<MeetingRoomRequest>>("/api/meeting-room/approved", {
            params: {
                month,
                limit
            }
        });
        return response;
    },
    postMeetingRoomRequest: async (data : MeetingRoomRequestPost) => {
        const response = await api.post("/api/meeting-room", data);
        return response;
    },
}

export default meetingRoomApi