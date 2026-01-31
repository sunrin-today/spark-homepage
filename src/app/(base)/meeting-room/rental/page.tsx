
"use client"
import { BackButton } from "@/components/ui/button/BackButton";
import Calendar from "@/components/schedule/Calendar";
import { useGetMeetingRoomSchedule } from "@/lib/queries/meeting-room/queries";
import { useEffect, useState } from "react";
import { buildMeetingRoomRequestIntoSchedule } from "@/utils/meeting-room";
import MeetingRoomRequestModal from "@/components/meeting-room/MeetingRoomRequestModal";
import { useModal } from "@/contexts/ModalContexts";
import { useAuth } from "@/contexts/AuthContexts";
import { usePostMeetingRoomRequest } from "@/lib/queries/meeting-room/mutations";


export default function MeetingRoomRentalPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() );
  const { data : meetingSchedule } = useGetMeetingRoomSchedule({ month: currentMonth + 1, limit: 100 });
  const { open, close } = useModal();
  const { mutate } = usePostMeetingRoomRequest();
  useEffect(() => {
    console.log(meetingSchedule?.data);
  }, [currentMonth])
  const user = useAuth();
  return (
   <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <h1 className="flex flex-col gap-11 text-3xl sm:text-4xl font-semibold pb-8  sm:pb-16">
          <BackButton />
          소회의실 대여신청하기
      </h1>
        <div className="max-w-[1156px] mx-auto">
          <Calendar
           schedules={[]}
           onMonthChange={(year, month) => setCurrentMonth(month)}
           reservedDates={meetingSchedule?.data.items.map((schedule) => schedule.wantedDate)}
           onEmptyDateClick={
            (date) => {
              open(
                <MeetingRoomRequestModal
                 username={user?.user?.displayName!} 
                 onClose={close} 
                 onConfirm={(date, purpose) => {
                  mutate({
                    wantedDate: date,
                    purpose: purpose,
                    color: "#00ADD8"
                  })
                  close();
                 }} 
                 date={date.year + "-" + (date.month + 1) + "-" + date.date}
                />
              )
            }
           }
          />
          <p className="text-base pl-4 pt-3 font-semibold text-[#777777]">대여 희망 날짜를 클릭해주세요</p>
        </div>
  </div>
  )
}