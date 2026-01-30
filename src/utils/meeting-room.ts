import { ListResponse } from "@/types/common"
import { MeetingRoomRequest } from "@/types/meeting-room"
import { Schedule } from "@/types/schedule"

export const buildMeetingRoomRequestIntoSchedule = (data: ListResponse<MeetingRoomRequest>): Schedule[] => {
  console.log(data)
  return data.items.map((item) => ({
    id: item.id,
    title: item.borrower.name,
    description: item.purpose || "",
    startDate: item.wantedDate,
    endDate: item.wantedDate,
    color: "#FF8E94",
    type: "ACADEMIC" as const,
    eventId: null,
  }))
}