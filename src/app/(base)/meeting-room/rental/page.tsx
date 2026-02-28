
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
import type { CalendarItem } from "@/types/calendar";
import { DateInput } from "@/components/ui/input/DateInput";

export default function MeetingRoomRentalPage() {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | undefined>(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`);
  const { data : meetingSchedule } = useGetMeetingRoomSchedule({ month: currentMonth + 1, limit: 100 });
  const { open, close } = useModal();
  const { mutate } = usePostMeetingRoomRequest();
  useEffect(() => {
    console.log(selectedDate, new Date());
  }, [selectedDate]);
  const calendarItems: CalendarItem[] = meetingSchedule?.data.items.map((s) => ({
    id: s.id,
    title: s.borrower.name,
    startDate: s.wantedDate,
    endDate: s.wantedDate,
    color: "#3B82F6",
  })) ?? [];
  
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear((y) => y - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear((y) => y + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };
  const handlePostMeetingRoomRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedDate) {
      alert("날짜를 선택해주세요");
      return;
    }
    mutate({ wantedDate: selectedDate!, purpose: "소회의실 대여", color: "#3B82F6" });
  };
  return (
   <div className="w-full flex flex-col gap-9 px-3 py-6 md:py-12 md:px-32 justify-center ">
    <h1 className="flex items-center gap-3 text-black font-semibold text-left text-base md:text-2xl w-full">
        <BackButton />
        소회의실 대여신청하기
    </h1>
    <div className="px-3"> 
      <Calendar year={currentYear} month={currentMonth} items={calendarItems} onPrevMonth={handlePrevMonth} onNextMonth={handleNextMonth} />
    </div>

    <form className="flex flex-col gap-4" onSubmit={handlePostMeetingRoomRequest}>
      <div className="flex flex-col py-1 gap-[10px]">
        <p className="text-sm text-[#767676]">대여 희망 날짜</p>
        <div className="w-full max-w-[400px]">
          <DateInput value={selectedDate} onChange={setSelectedDate} />
        </div>
      </div>
      <button disabled={!selectedDate} className={`w-fit px-4 py-3 text-base font-medium rounded-2xl bg-black text-white ${!selectedDate ? "opacity-50 cursor-not-allowed" : ""}`} type="submit">대여하기</button>
    </form>
  </div>
  )
}