"use client";

import { useState, useRef, useEffect } from "react";
import Calendar from "@/components/schedule/Calendar";
import ScheduleList from "@/components/schedule/ScheduleList";
import { Schedule } from "@/types/schedule";
import { dummySchedules } from "@/lib/dummySchedule";

export default function SchedulePage() {
  const [schedules] = useState<Schedule[]>(dummySchedules);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null,
  );
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (
        !target.closest("[data-schedule-popup]") &&
        !target.closest("[data-schedule-bar]") &&
        !target.closest("[data-schedule-item]")
      ) {
        setSelectedSchedule(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8" ref={pageRef}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-6">
          <div className="flex-1">
            <Calendar
              schedules={schedules}
              selectedSchedule={selectedSchedule}
              onScheduleClick={setSelectedSchedule}
            />
          </div>

          <div className="flex-shrink-0" style={{ marginTop: "68px" }}>
            <ScheduleList
              schedules={schedules}
              onScheduleClick={setSelectedSchedule}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
