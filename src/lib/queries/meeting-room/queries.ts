import { meetingRoomKeys } from "./keys";
import meetingRoomApi from "@/lib/api/meeting-room";
import { useQuery } from "@tanstack/react-query";

export const useGetMeetingRoomSchedule = ({month, limit = 100 }: { month?: number, limit?: number }) => {
    return useQuery({
        queryKey: meetingRoomKeys.list(1, limit, month),
        queryFn: () => meetingRoomApi.getMeetingRoomSchedule({month, limit}),
    })
};