"use client";

import { useState } from "react";
import { Schedule, CalendarDate } from "@/types/schedule";
import Calendar from "@/components/schedule/Calendar";
import ScheduleList from "@/components/schedule/ScheduleList";
import { useCalendarSchedules } from "@/lib/queries/schedule/queries";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function WeeklySchedule() {
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const { data: schedules = [], isLoading } = useCalendarSchedules(
    currentYear.toString(),
    (currentMonth + 1).toString()
  );

  const handleScheduleClick = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
  };

  const handleEmptyDateClick = (date: CalendarDate) => {
    console.log('빈 날짜 클릭:', date);
  };

  const handleMonthChange = (year: number, month: number) => {
    setCurrentYear(year);
    setCurrentMonth(month);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-xl">일정표</h3>
        <Link
          href="/schedule"
          className="flex items-center gap-1 px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded transition-colors"
        >
          자세히보기
          <Plus className="w-4 h-4" />
        </Link>
      </div>

      <div className="flex gap-6">
        <div className="flex-1">
          <Calendar
            schedules={schedules}
            selectedSchedule={selectedSchedule}
            onScheduleClick={handleScheduleClick}
            onEmptyDateClick={handleEmptyDateClick}
            onMonthChange={handleMonthChange}
          />
        </div>

        <div>
          <ScheduleList
            schedules={schedules}
            onScheduleClick={handleScheduleClick}
          />
        </div>
      </div>

      {selectedSchedule && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setSelectedSchedule(null)}
        />
      )}
    </div>
  );
}