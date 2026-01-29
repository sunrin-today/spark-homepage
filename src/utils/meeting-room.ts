import { ListResponse } from "@/types/common"
import { MeetingRoomRequest } from "@/types/meeting-room"
import { Schedule } from "@/types/schedule"

export const buildMeetingRoomRequestIntoSchedule = (data: ListResponse<MeetingRoomRequest>): Schedule[] => {
  console.log(data)
  return data.items.map((item) => ({
    id: item.id,
    title: item.borrower.name,
    startDate: item.wantedDate,
    endDate: item.wantedDate,
    color: "red"
  }))
}