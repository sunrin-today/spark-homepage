import { User } from "./auth"

export interface MeetingRoomRequest {
      id: string,
      wantedDate: string,
      borrower: User,
      purpose: string,
      status: number,
      createdAt: string,
      color: string
}
export interface MeetingRoomRequestPost {
      wantedDate: string,
      purpose: string
      color: string
}