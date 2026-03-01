import { meetingRoomKeys } from "./keys";
import meetingRoomApi from "@/lib/api/meeting-room";
import { useQuery } from "@tanstack/react-query";

export const useGetMeetingRoomSchedule = ({month, limit = 100, page = 1 }: { month?: number, limit?: number, page?: number }) => {
    return useQuery({
        queryKey: meetingRoomKeys.list(page, limit, month),
        queryFn: () => meetingRoomApi.getMeetingRoomSchedule({month, limit, page}),
    })
};