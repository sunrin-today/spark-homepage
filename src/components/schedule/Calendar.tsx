"use client";

import { useState, useRef, useEffect } from "react";
import { Schedule, CalendarDate } from "@/types/schedule";
import { getCalendarDates } from "@/utils/calender";

interface CalendarProps {
  schedules: Schedule[];
  selectedSchedule?: Schedule | null;
  onScheduleClick?: (schedule: Schedule) => void;
}

export default function Calendar({
  schedules,
  selectedSchedule,
  onScheduleClick,
}: CalendarProps) {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [popupPosition, setPopupPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const scheduleRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const dates = getCalendarDates(currentYear, currentMonth, schedules);
  const weeks = Array.from({ length: Math.ceil(dates.length / 7) }, (_, i) =>
    dates.slice(i * 7, (i + 1) * 7),
  );

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // 말풍선 위치 계산
  useEffect(() => {
    if (selectedSchedule) {
      const key = `${selectedSchedule.id}`;
      const element = scheduleRefs.current.get(key);

      if (element) {
        const rect = element.getBoundingClientRect();
        setPopupPosition({
          x: rect.left + rect.width,
          y: rect.top + rect.height / 2,
        });
      }
    } else {
      setPopupPosition(null);
    }
  }, [selectedSchedule, currentYear, currentMonth]);

  // 각 주의 일정 바 렌더링하는 함수
  const renderWeekSchedules = (week: CalendarDate[], weekIndex: number) => {
    const renderedSchedules = new Set<string>();
    const scheduleRows: React.ReactElement[][] = [[], [], [], []];

    week.forEach((dateInfo, dayIndex) => {
      dateInfo.schedules.forEach((schedule) => {
        const scheduleKey = `${schedule.id}-${weekIndex}`;
        if (renderedSchedules.has(scheduleKey)) return;

        const startDate = new Date(schedule.startDate);
        const endDate = new Date(schedule.endDate);
        const currentDate = new Date(
          dateInfo.year,
          dateInfo.month,
          dateInfo.date,
        );

        // 이 날짜가 일정의 시작일인지
        const isStartOfSchedule =
          startDate.getFullYear() === currentDate.getFullYear() &&
          startDate.getMonth() === currentDate.getMonth() &&
          startDate.getDate() === currentDate.getDate();

        // 이 주의 첫날이면서 일정이 이미 시작된 경우
        const isStartOfWeek = dayIndex === 0;
        const scheduleStartedBefore = currentDate > startDate;

        // 일정이 이 날짜에 시작하거나/주 첫날인데 일정이 계속 진행중인 경우만 렌더링
        if (!isStartOfSchedule && !(isStartOfWeek && scheduleStartedBefore))
          return;

        let span = 0;

        // 이 주에서 일정이 며칠 동안 지속되는지 계산 (주 끝까지만)
        for (let i = dayIndex; i < 7; i++) {
          const checkDate = new Date(week[i].year, week[i].month, week[i].date);
          // 일정의 종료일을 넘지 않고 주의 끝을 넘지 않는 범위에서 span 계산
          if (checkDate <= endDate) {
            span++;
          } else {
            break;
          }
        }

        renderedSchedules.add(scheduleKey);

        let rowIndex = 0;
        for (let i = 0; i < scheduleRows.length; i++) {
          if (!scheduleRows[i][dayIndex]) {
            rowIndex = i;
            break;
          }
        }

        for (let i = dayIndex; i < dayIndex + span && i < 7; i++) {
          scheduleRows[rowIndex][i] = <div key={`placeholder-${i}`} />;
        }

        const GAP = 8;
        const CELL_WIDTH = `calc((100% - ${GAP * 6}px) / 7)`;
        const barWidth = `calc(${CELL_WIDTH} * ${span} + ${GAP * (span - 1)}px)`;
        const leftPosition = `calc(${CELL_WIDTH} * ${dayIndex} + ${GAP * dayIndex}px)`;

        scheduleRows[rowIndex][dayIndex] = (
          <div
            key={scheduleKey}
            ref={(el) => {
              if (el) scheduleRefs.current.set(schedule.id, el);
            }}
            data-schedule-bar
            onClick={(e) => {
              e.stopPropagation();
              onScheduleClick?.(schedule);
            }}
            className="absolute h-5 text-xs font-medium text-black flex items-center cursor-pointer hover:opacity-90"
            style={{
              backgroundColor: schedule.color,
              width: barWidth,
              left: leftPosition,
              paddingLeft: "8px",
              paddingRight: "8px",
              borderRadius: "4px",
            }}
          >
            <span className="truncate">{schedule.title}</span>
          </div>
        );
      });
    });

    return scheduleRows;
  };

  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-center gap-4 mb-6">
        <button
          onClick={handlePrevMonth}
          className="p-2 hover:bg-gray-100 rounded transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-bold min-w-[100px] text-center">
          {String(currentMonth + 1).padStart(2, "0")}월
        </h2>
        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-gray-100 rounded transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
          <div
            key={day}
            className="flex items-center h-[30px] rounded-[5px] border"
            style={{
              paddingLeft: "14px",
              borderColor: index === 0 ? "#FF805C" : "#EEE",
            }}
          >
            <span className="text-sm font-medium">{day}</span>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        {weeks.map((week, weekIndex) => {
          const scheduleRows = renderWeekSchedules(week, weekIndex);

          return (
            <div key={weekIndex} className="relative">
              <div className="grid grid-cols-7 gap-2">
                {week.map((dateInfo, dayIndex) => {
                  const isSunday = dayIndex === 0;
                  return (
                    <div
                      key={`${dateInfo.year}-${dateInfo.month}-${dateInfo.date}`}
                      className="min-h-[120px] rounded-[5px] relative"
                      style={{
                        backgroundColor: isSunday ? "#FFAF99" : "#EEE",
                      }}
                    >
                      <div className="p-2">
                        <div
                          className={`text-sm font-medium ${
                            dateInfo.isCurrentMonth
                              ? "text-gray-900"
                              : "text-gray-400"
                          }`}
                        >
                          {String(dateInfo.date).padStart(2, "0")}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div
                className="absolute top-[32px] left-0 right-0 pointer-events-none overflow-hidden"
                style={{ height: "88px" }}
              >
                <div className="relative" style={{ height: "88px" }}>
                  {scheduleRows.map((row, rowIndex) => (
                    <div
                      key={rowIndex}
                      className="relative w-full pointer-events-auto"
                      style={{
                        height: "20px",
                        marginBottom: rowIndex < 3 ? "2px" : "0",
                      }}
                    >
                      {row.filter(Boolean)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedSchedule && popupPosition && (
        <div
          data-schedule-popup
          className="fixed z-50"
          style={{
            left: popupPosition.x + 10,
            top: popupPosition.y,
            transform: "translateY(-50%)",
          }}
        >
          <div
            className="bg-white rounded-[20px] p-6 shadow-xl relative"
            style={{
              border: "1px solid #E0E0E0",
              minWidth: "360px",
              maxWidth: "400px",
            }}
          >
            <div
              className="absolute"
              style={{
                left: -8,
                top: "50%",
                transform: "translateY(-50%)",
                width: 0,
                height: 0,
                borderTop: "8px solid transparent",
                borderBottom: "8px solid transparent",
                borderRight: "8px solid white",
              }}
            />

            <div
              className="flex items-center gap-3 mb-6 rounded-full py-2 px-4"
              style={{ backgroundColor: "#F5F5F5" }}
            >
              <div
                className="w-8 h-8 rounded-full flex-shrink-0"
                style={{ backgroundColor: selectedSchedule.color }}
              />
              <h3 className="text-sm font-medium flex-1">
                {selectedSchedule.title}
              </h3>
            </div>

            <div className="space-y-2 mb-4">
              <div>
                <span className="text-sm font-bold">시작일 </span>
                <span className="text-sm font-normal">
                  {selectedSchedule.startDate}
                </span>
              </div>
              <div>
                <span className="text-sm font-bold">종료일 </span>
                <span className="text-sm font-normal">
                  {selectedSchedule.endDate}
                </span>
              </div>
            </div>

            {selectedSchedule.description && (
              <div className="mt-4">
                <p className="text-xs leading-relaxed text-black break-all">
                  {selectedSchedule.description}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
