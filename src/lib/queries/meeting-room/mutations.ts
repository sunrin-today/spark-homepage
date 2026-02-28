import { MeetingRoomRequestPost } from "@/types/meeting-room"
import { useMutation } from "@tanstack/react-query"
import meetingRoomApi from "@/lib/api/meeting-room"
import { useRouter } from "next/navigation"

export const usePostMeetingRoomRequest = () => {
    const router = useRouter()
    return useMutation({
        mutationFn: (data: MeetingRoomRequestPost) => meetingRoomApi.postMeetingRoomRequest(data),
        onSuccess: (data, variables) => {
            router.push(`/meeting-room/rental/success?data=${variables.wantedDate}`)
        },
        onError: () => {
            alert("소회의실 대여 신청 중 오류가 발생했습니다")
        }
    })
}

