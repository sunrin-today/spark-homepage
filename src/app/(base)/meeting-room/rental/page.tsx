
"use client"
import { BackButton } from "@/components/ui/button/BackButton";
import Calendar from "@/components/common/Calendar/Calendar";
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
   <div className="w-full flex flex-col gap-6 px-3 py-6 md:py-12 md:px-32 justify-center ">
    <h1 className="flex items-center gap-3 text-black font-semibold text-left text-base md:text-2xl w-full">
        <BackButton />
        소회의실 대여신청하기
    </h1>
    <div>
      <p className="text-base pl-4 pt-3 font-semibold text-[#777777]">대여 희망 날짜를 클릭해주세요</p>
    </div>
  </div>
  )
}