import { MeetingRoomRequestPost } from "@/types/meeting-room"
import { useMutation } from "@tanstack/react-query"
import meetingRoomApi from "@/lib/api/meeting-room"

export const usePostMeetingRoomRequest = () => {
    return useMutation({
        mutationFn: (data: MeetingRoomRequestPost) => meetingRoomApi.postMeetingRoomRequest(data),
        onSuccess: () => {
            alert("소회의실 대여 신청이 완료되었습니다!")
        },
        onError: () => {
            alert("소회의실 대여 신청 중 오류가 발생했습니다")
        }
    })
}

