"use client";

import { useState } from "react";
import { Schedule } from "@/types/schedule";
import Calendar from "@/components/schedule/Calendar";
import ScheduleList from "@/components/schedule/ScheduleList";

interface WeeklyScheduleProps {
  schedules: Schedule[];
}

export default function WeeklySchedule({ schedules }: WeeklyScheduleProps) {
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null,
  );

  const handleScheduleClick = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-xl">일정표</h3>

        <button className="px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded transition-colors">
          자세히보기 +
        </button>
      </div>

      <div className="flex gap-6">
        <div className="flex-1">
          <Calendar
            schedules={schedules}
            selectedSchedule={selectedSchedule}
            onScheduleClick={handleScheduleClick}
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
