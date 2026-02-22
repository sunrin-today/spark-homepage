"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MealDay {
  date: number;
  meals: string[];
  isCurrentMonth: boolean;
  isToday: boolean;
  dayOfWeek: number;
}

const WEEK_DAYS = ["일", "월", "화", "수", "목", "금", "토"];

const DUMMY_MEALS = ["백미밥", "아비꼬카레", "+ 3"];

function buildCalendar(year: number, month: number): MealDay[] {
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const prevLastDate = new Date(year, month, 0).getDate();
  const today = new Date();

  const days: MealDay[] = [];

  // 이전 달
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = prevLastDate - i;
    days.push({
      date: d,
      meals: DUMMY_MEALS,
      isCurrentMonth: false,
      isToday: false,
      dayOfWeek: days.length % 7,
    });
  }

  // 이번 달
  for (let d = 1; d <= lastDate; d++) {
    const dow = (firstDay + d - 1) % 7;
    const isToday =
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === d;
    days.push({
      date: d,
      meals: DUMMY_MEALS,
      isCurrentMonth: true,
      isToday,
      dayOfWeek: dow,
    });
  }

  // 다음 달
  const remaining = 7 - (days.length % 7);
  if (remaining < 7) {
    for (let d = 1; d <= remaining; d++) {
      days.push({
        date: d,
        meals: DUMMY_MEALS,
        isCurrentMonth: false,
        isToday: false,
        dayOfWeek: days.length % 7,
      });
    }
  }

  return days;
}

export default function MealCalendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const days = buildCalendar(year, month);
  const weeks: MealDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const handlePrev = () => {
    if (month === 0) {
      setYear((y) => y - 1);
      setMonth(11);
    } else {
      setMonth((m) => m - 1);
    }
  };

  const handleNext = () => {
    if (month === 11) {
      setYear((y) => y + 1);
      setMonth(0);
    } else {
      setMonth((m) => m + 1);
    }
  };

  return (
    <div className="w-full">
      <h3 className="font-semibold text-[24px] mb-12">급식</h3>

      <div className="grid grid-cols-7 px-3 mb-4 items-center">
        <div className="col-span-1 pl-[12px]">
          <span className="text-[20px] font-medium text-black">
            {year}년 {String(month + 1).padStart(2, "0")}월
          </span>
        </div>

        <div className="col-span-6 flex justify-end gap-5">
          <button
            onClick={handlePrev}
            className="w-8 h-8 flex items-center justify-center"
          >
            <ChevronLeft size={16} strokeWidth={1.5} />
          </button>

          <button
            onClick={handleNext}
            className="w-8 h-8 flex items-center justify-center"
          >
            <ChevronRight size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* 달력 */}
      <div className="w-full">
        {/* 요일 */}
        <div className="grid grid-cols-7 border-b border-[#D1D1D1] px-3">
          {WEEK_DAYS.map((day, i) => (
            <div
              key={day}
              className="text-base font-medium"
              style={{
                paddingLeft: 12,
                color:
                  i === 0
                    ? "#FA5353"
                    : i === 6
                    ? "#4D71FF"
                    : "#505050",
              }}
            >
              {day}
            </div>
          ))}
        </div>

        {/* 날짜 행 */}
        {weeks.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 px-3 py-3">
            {week.map((day, di) => {
              const isSun = di === 0;
              const isSat = di === 6;

              const opacity = !day.isCurrentMonth
                ? 0.4
                : day.isToday
                ? 1
                : 0.7;

              const dateColor = isSun
                ? "#FA5353"
                : isSat
                ? "#4D71FF"
                : "#505050";

              const regularMeals = day.meals.filter(
                (m) => !m.trimStart().startsWith("+")
              );

              const plusItem = day.meals.find((m) =>
                m.trimStart().startsWith("+")
              );

              return (
                <div
                  key={di}
                  className="min-h-[80px]"
                  style={{ opacity, padding: 12 }}
                >
                  {day.isToday ? (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        backgroundColor: "#FF805C",
                        color: "#ffffff",
                        fontSize: 12,
                        fontWeight: 600,
                        lineHeight: 1,
                      }}
                    >
                      {day.date}
                    </span>
                  ) : (
                    <span
                      style={{
                        fontSize: 16,
                        lineHeight: 1,
                        color: dateColor,
                      }}
                    >
                      {day.date}
                    </span>
                  )}

                  <div className="flex flex-col gap-2 mt-3">
                    {regularMeals.map((meal, mi) => (
                      <span
                        key={mi}
                        className="text-[16px] font-medium text-black leading-tight"
                      >
                        {meal}
                      </span>
                    ))}

                    {plusItem && (
                      day.isToday ? (
                        <span className="text-[12px] font-medium text-white bg-black px-1 py-[2px] rounded-lg w-fit">
                          {plusItem}
                        </span>
                      ) : (
                        <span className="text-[12px] font-medium text-black">
                          {plusItem}
                        </span>
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}