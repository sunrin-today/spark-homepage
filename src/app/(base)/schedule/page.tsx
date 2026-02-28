'use client';

import { useState } from 'react';
import Calendar from '@/components/common/Calendar/Calendar';
import ScheduleBottomSheet from '@/components/common/Calendar/ScheduleBottomSheet';
import { useCalendarSchedules } from '@/lib/queries/schedule/queries';
import { CalendarItem } from '@/types/calendar';

export default function SchedulePage() {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  // 바텀시트 상태
  const [bottomSheet, setBottomSheet] = useState<{
    isOpen: boolean;
    date: { year: number; month: number; day: number } | null;
  }>({ isOpen: false, date: null });

  const { data: schedules = [], isError } = useCalendarSchedules(
    String(currentYear),
    String(currentMonth + 1)
  );

  const calendarItems: CalendarItem[] = schedules.map((s) => ({
    id: s.id,
    title: s.title,
    startDate: s.startDate,
    endDate: s.endDate,
    color: s.color,
  }));

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

  const handleDateClick = (year: number, month: number, day: number) => {
    setBottomSheet({ isOpen: true, date: { year, month, day } });
  };

  // 클릭된 날짜에 해당하는 일정 필터링
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

  return (
    <div className="w-full flex flex-col md:py-12 md:px-32 pb-6 items-center justify-center">
      <div className="w-full flex flex-col pt-6 px-6 md:pt-0 md:px-0 md:gap-3 md:mb-6">
        <h1 className="text-black font-semibold text-left text-base md:text-2xl w-full mb-4 md:mb-0">
          일정
        </h1>

        {isError && (
          <p className="text-sm text-[#FF0000]">일정을 불러오는데 실패했습니다.</p>
        )}

        <Calendar
          year={currentYear}
          month={currentMonth}
          items={calendarItems}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onDateClick={handleDateClick}
        />
      </div>

      <ScheduleBottomSheet
        isOpen={bottomSheet.isOpen}
        onClose={() => setBottomSheet((s) => ({ ...s, isOpen: false }))}
        date={bottomSheet.date}
        items={selectedDateItems}
      />
    </div>
  );
}