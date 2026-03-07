import { meetingRoomKeys } from "./keys";
import meetingRoomApi from "@/lib/api/meeting-room";
import { useQuery } from "@tanstack/react-query";

export const useGetMeetingRoomSchedule = ({month, limit = 100, page = 1, column, orderDirection }: { month?: number, limit?: number, page?: number, column?: string, orderDirection?: string }) => {
    return useQuery({
        queryKey: meetingRoomKeys.list(page, limit, month, column, orderDirection),
        queryFn: () => meetingRoomApi.getMeetingRoomSchedule({month, limit, page, column: column || "wantedDate", orderDirection: orderDirection || "DESC"}),
    })
};