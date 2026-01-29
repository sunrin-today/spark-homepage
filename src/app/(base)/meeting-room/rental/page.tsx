
"use client"
import { BackButton } from "@/components/ui/button/BackButton";
import Calendar from "@/components/schedule/Calendar";
import { useGetMeetingRoomSchedule } from "@/lib/queries/meeting-room/queries";
import { useState } from "react";
import { buildMeetingRoomRequestIntoSchedule } from "@/utils/meeting-room";


export default function MeetingRoomRentalPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() );
  const { data : meetingSchedule } = useGetMeetingRoomSchedule({ month: currentMonth, limit: 100 });
  return (
   <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <h1 className="flex flex-col gap-11 text-3xl sm:text-4xl font-semibold pb-8  sm:pb-16">
          <BackButton />
          소회의실 대여신청하기
      </h1>
      {
        meetingSchedule &&
        <div>
          <Calendar schedules={buildMeetingRoomRequestIntoSchedule(meetingSchedule?.data)}  />
        </div>
      }
  </div>
  )
}