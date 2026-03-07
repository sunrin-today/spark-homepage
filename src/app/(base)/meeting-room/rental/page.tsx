
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
import ScheduleBottomSheet from "@/components/schedule/ScheduleBottomSheet";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function MeetingRoomRentalPage() {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | undefined>(`${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`);
  const { data : meetingSchedule, isError, isLoading } = useGetMeetingRoomSchedule({ month: currentMonth + 1, limit: 100 });
  const { open, close } = useModal();
  const { mutate, isPending } = usePostMeetingRoomRequest();
  const [bottomSheet, setBottomSheet] = useState<{
    isOpen: boolean;
    date: { year: number; month: number; day: number } | null;
  }>({ isOpen: false, date: null });
  const calendarItems: CalendarItem[] = meetingSchedule?.data.items.map((s) => ({
    id: s.id,
    title: s.borrower.name,
    startDate: s.wantedDate,
    endDate: s.wantedDate,
    color: "#FF6161",
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
   const selectedDateItems =
    bottomSheet.date
      ? calendarItems.filter((item) => {
          const { year, month, day } = bottomSheet.date!;
          const cellDate = new Date(year, month, day);

          const parseUTC = (str: string) => {
            const d = new Date(str);
            return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
          };

          const start = parseUTC(item.startDate);
          const end = parseUTC(item.endDate);
          return cellDate >= start && cellDate <= end;
        })
    : [];
  const handlePostMeetingRoomRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedDate) {
      alert("날짜를 선택해주세요");
      return;
    }
    mutate({ wantedDate: selectedDate!, purpose: "소회의실 대여", color: "#3B82F6" });
  };
  const handleDateClick = (year: number, month: number, day: number) => {
    setBottomSheet({ isOpen: true, date: { year, month, day } });
  };
  return (
   <div className="w-full flex flex-col gap-9 px-3 py-6 md:py-12 md:px-32 justify-center ">
    <h1 className="flex items-center gap-3 text-black font-semibold text-left text-base md:text-2xl w-full">
        <BackButton />
        소회의실 대여신청하기
    </h1>
    <div className="px-3"> 
      {isError && <p className="text-sm text-[#FF0000]">에러가 발생했습니다.</p>}
      <div className="relative">
          <Calendar
            year={currentYear}
            month={currentMonth}
            items={isLoading ? [] : calendarItems}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            onDateClick={handleDateClick}
          />

          {isLoading && (
            <div className="absolute inset-0 top-[52px] flex items-center justify-center bg-white/60 rounded-lg">
              <div className="flex flex-col items-center gap-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF805C]" />
                <span className="text-sm text-[#767676]">일정을 불러오는 중...</span>
              </div>
            </div>
          )}
      </div>
    </div>

    <form className="flex flex-col gap-4" onSubmit={handlePostMeetingRoomRequest}>
      <div className="flex flex-col py-1 gap-[10px]">
        <p className="text-xs md:sm text-[#767676]">대여 희망 날짜</p>
        <div className="w-full max-w-[206px] md:max-w-[400px]">
          <DateInput value={selectedDate} onChange={setSelectedDate} />
        </div>
      </div>
      <button disabled={!selectedDate || isError || isPending} className={`w-fit py-[9px] px-[43px] text-xs rounded-lg  md:px-4 md:py-3 md:text-base font-medium md:rounded-2xl bg-black text-white ${!selectedDate || isError || isPending ? "opacity-50 cursor-not-allowed" : ""}`} type="submit">{isPending ? "요청 중..." : "대여하기"}</button>
    </form>
    <ScheduleBottomSheet isOpen={bottomSheet.isOpen} onClose={() => setBottomSheet((s) => ({ ...s, isOpen: false }))} date={bottomSheet.date} items={selectedDateItems} />
  </div>
  )
}