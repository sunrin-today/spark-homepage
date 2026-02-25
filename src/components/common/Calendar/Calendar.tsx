"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { CalendarProps, CalendarDateCell } from "@/types/calendar";
import { buildCalendarCells, buildEventSegmentsForWeek } from "@/utils/calendar";
import CalendarEventLayer from "./CalendarEventLayer";
import { useIsMobile } from "@/hooks/useIsMobile";

const WEEK_DAYS = ["일", "월", "화", "수", "목", "금", "토"];

const DAY_COLORS: Record<number, string> = {
  0: "#FA5353",
  6: "#4D71FF",
};

const BAR_HEIGHT = 37;
const BAR_GAP = 3;
const CELL_PADDING = 12;

const DESKTOP_CELL_HEIGHT = 140;
const DATE_BADGE_SIZE = 24;
const DATE_BADGE_SIZE_MOBILE = 24;

function getEventLayerHeight(rowCount: number): number {
  if (rowCount === 0) return 0;
  return rowCount * BAR_HEIGHT + (rowCount - 1) * BAR_GAP;
}

function DateBadge({
  cell,
  dayIndex,
  isMobile,
}: {
  cell: CalendarDateCell;
  dayIndex: number;
  isMobile: boolean;
}) {
  const color = DAY_COLORS[dayIndex] ?? "#505050";
  const size = isMobile ? DATE_BADGE_SIZE_MOBILE : DATE_BADGE_SIZE;
  const fontSize = isMobile ? 14 : 16;
  const fontWeight = isMobile ? 500 : 400;

  if (cell.isToday) {
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: size,
          height: size,
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
        lineHeight: `${size}px`,
        display: "block",
        height: size,
        flexShrink: 0,
      }}
    >
      {cell.date}
    </span>
  );
}

export default function Calendar({
  year,
  month,
  items,
  onPrevMonth,
  onNextMonth,
  onDateClick,
}: CalendarProps & {
  onDateClick?: (year: number, month: number, day: number) => void;
}) {
  const isMobile = useIsMobile();
  const weeks = buildCalendarCells(year, month);

  const MOBILE_CELL_HEIGHT = 40;
  const MOBILE_ROW_GAP = 12;

  return (
    <div className="w-full select-none">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center">
          <span className="px-2 py-1 text-sm md:text-[20px] font-medium text-black">
            {year}년
          </span>
          <span className="px-2 py-1 text-sm md:text-[20px] font-medium text-black">
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
      <div
        style={
          isMobile
            ? { display: "flex", flexDirection: "column", gap: MOBILE_ROW_GAP }
            : undefined
        }
      >
        {weeks.map((week, weekIndex) => {
          const segments = buildEventSegmentsForWeek(week, items);
          const eventRowCount =
            segments.length > 0
              ? Math.max(...segments.map((s) => s.rowIndex)) + 1
              : 0;

          const desktopMinHeight = Math.max(
            DESKTOP_CELL_HEIGHT,
            CELL_PADDING + DATE_BADGE_SIZE + CELL_PADDING + getEventLayerHeight(eventRowCount) + CELL_PADDING
          );
          const cellHeight = isMobile ? MOBILE_CELL_HEIGHT : desktopMinHeight;

          return (
            <div
              key={weekIndex}
              className="relative grid grid-cols-7"
              style={{ minHeight: cellHeight }}
            >
              {week.map((cell, dayIndex) => {
                const opacity = !cell.isCurrentMonth ? 0.4 : cell.isToday ? 1 : 0.7;

                return (
                  <div
                    key={`${cell.year}-${cell.month}-${cell.date}`}
                    style={{
                      opacity,
                      minHeight: cellHeight,
                      padding: CELL_PADDING,
                      cursor: isMobile ? "pointer" : "default",
                    }}
                    onClick={() => {
                      if (isMobile && onDateClick) {
                        onDateClick(cell.year, cell.month, cell.date);
                      }
                    }}
                    className={isMobile ? "active:bg-[#F5F5F5] rounded-lg transition-colors" : ""}
                  >
                    <DateBadge
                      cell={cell}
                      dayIndex={dayIndex}
                      isMobile={isMobile}
                    />
                  </div>
                );
              })}

              {!isMobile && (
                <CalendarEventLayer
                  segments={segments}
                  eventRowCount={eventRowCount}
                  cellHeight={desktopMinHeight}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}