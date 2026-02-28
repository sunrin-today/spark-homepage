"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { CalendarProps, CalendarDateCell } from "@/types/calendar";
import { buildCalendarCells } from "@/utils/calendar";

const WEEK_DAYS = ["일", "월", "화", "수", "목", "금", "토"];

const DAY_COLORS: Record<number, string> = {
  0: "#FA5353",
  6: "#4D71FF",
};

const CELL_PADDING = 12;
const MOBILE_CELL_HEIGHT = 40;
const MOBILE_ROW_GAP = 12;
const DATE_BADGE_SIZE = 24;

function DateBadge({
  cell,
  dayIndex,
  selectedDate,
}: {
  cell: CalendarDateCell;
  dayIndex: number;
  selectedDate?: Date;
}) {
  const color = DAY_COLORS[dayIndex] ?? "#505050";
  const fontSize = 14;
  const fontWeight = 500;

  // Check if this date is the selected date
  const isSelected = selectedDate &&
    selectedDate.getFullYear() === cell.year &&
    selectedDate.getMonth() === cell.month &&
    selectedDate.getDate() === cell.date;

    
  if (isSelected) {
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: DATE_BADGE_SIZE,
          height: DATE_BADGE_SIZE,
          borderRadius: "50%",
          backgroundColor: "#000000",
          color: "#FFFFFF",
          fontSize,
          lineHeight: 1,
          flexShrink: 0,
        }}
      >
        {cell.date}
      </span>
    );
  }
  if (cell.isToday) {
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: DATE_BADGE_SIZE,
          height: DATE_BADGE_SIZE,
          borderRadius: "50%",
          backgroundColor: "#FF805C",
          color: "#FFFFFF",
          fontSize,
          lineHeight: 1,
          flexShrink: 0,
        }}
      >
        {cell.date}
      </span>
    );
  }


  return (
    <span
      style={{
        fontSize,
        fontWeight,
        color,
        lineHeight: `${DATE_BADGE_SIZE}px`,
        display: "block",
        height: DATE_BADGE_SIZE,
        flexShrink: 0,
      }}
    >
      {cell.date}
    </span>
  );
}

export default function InputCalendar({
  year,
  month,
  items,
  onPrevMonth,
  onNextMonth,
  onDateClick,
  selectedDate,
}: CalendarProps & {
  onDateClick?: (year: number, month: number, day: number) => void;
  selectedDate?: Date;
}) {
  const weeks = buildCalendarCells(year, month);

  return (
    <div className="w-full select-none">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center">
          <span className="px-2 py-1 text-sm font-medium text-black">
            {year}년
          </span>
          <span className="px-2 py-1 text-sm font-medium text-black">
            {String(month + 1).padStart(2, "0")}월
          </span>
        </div>
        <div className="flex items-center gap-5 ml-auto">
          <button
            onClick={onPrevMonth}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors"
            aria-label="이전 달"
          >
            <ChevronLeft size={16} color="#0D0D0D" strokeWidth={1.5} />
          </button>
          <button
            onClick={onNextMonth}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors"
            aria-label="다음 달"
          >
            <ChevronRight size={16} color="#0D0D0D" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Week Header */}
      <div className="grid grid-cols-7 border-b border-[#D1D1D1]">
        {WEEK_DAYS.map((day, i) => (
          <div
            key={day}
            className="text-base font-medium py-2"
            style={{
              paddingLeft: CELL_PADDING,
              color: DAY_COLORS[i] ?? "#0D0D0D",
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: "flex", flexDirection: "column", gap: MOBILE_ROW_GAP }}>
        {weeks.map((week, weekIndex) => (
          <div
            key={weekIndex}
            className="relative grid grid-cols-7"
            style={{ minHeight: MOBILE_CELL_HEIGHT }}
          >
            {week.map((cell, dayIndex) => {
              const opacity = !cell.isCurrentMonth ? 0.4 : cell.isToday ? 1 : 0.7;

              return (
                <div
                  key={`${cell.year}-${cell.month}-${cell.date}`}
                  style={{
                    opacity,
                    minHeight: MOBILE_CELL_HEIGHT,
                    padding: CELL_PADDING,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (onDateClick && items.every((item) => item.startDate !== `${cell.year}-${cell.month + 1}-${cell.date}`)) {
                      onDateClick(cell.year, cell.month, cell.date);
                    }
                  }}
                  className="active:bg-[#F5F5F5] rounded-lg transition-colors"
                >
                  <DateBadge
                    cell={cell}
                    dayIndex={dayIndex}
                    selectedDate={selectedDate}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}