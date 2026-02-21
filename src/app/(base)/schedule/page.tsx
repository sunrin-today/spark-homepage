'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import Calendar from '@/components/common/Calendar/Calendar';
import { useCalendarSchedules } from '@/lib/queries/schedule/queries';
import { CalendarItem } from '@/types/calendar';

export default function SchedulePage() {
  const router = useRouter();
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

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

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">일정을 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col py-12 px-32 items-center justify-center">
      <div className="w-full flex flex-col gap-3 mb-6 ">
        <h1 className="text-black font-semibold text-left text-base md:text-2xl w-full">일정</h1>  

        <Calendar
          year={currentYear}
          month={currentMonth}
          items={calendarItems}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />
      </div>
    </div>
  );
}
