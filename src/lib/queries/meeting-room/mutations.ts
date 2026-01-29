import { MeetingRoomRequestPost } from "@/types/meeting-room"
import { useMutation } from "@tanstack/react-query"
import meetingRoomApi from "@/lib/api/meeting-room"

export const usePostMeetingRoomRequest = () => {
    return useMutation({
        mutationFn: (data: MeetingRoomRequestPost) => meetingRoomApi.postMeetingRoomRequest(data),
    })
}

