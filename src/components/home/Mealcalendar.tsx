"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMealByYearMonth } from "@/lib/queries/meal/queries";
import { MealResponse } from "@/types/meal";

interface MealDay {
  date: number;
  meals: string[];
  isCurrentMonth: boolean;
  isToday: boolean;
  dayOfWeek: number;
}

const WEEK_DAYS = ["일", "월", "화", "수", "목", "금", "토"];
const MAX_DISPLAY_MEALS = 2;

function buildMealMap(meals: MealResponse[] | null | undefined): Record<number, string[]> {
  if (!meals) return {};
  const map: Record<number, string[]> = {};
  
  for (const meal of meals) {
    const dateStr = meal.mealDate.replace(/-/g, "");
    const day = parseInt(dateStr.slice(6, 8), 10);
    if (!day) continue;

    map[day] = Array.isArray(meal.menu) 
      ? meal.menu.map(s => s.trim()).filter(Boolean) 
      : [];
  }
  return map;
}

function buildCalendar(
  year: number,
  month: number,
  mealMap: Record<number, string[]>,
): MealDay[] {
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
      meals: [],
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

    const allMeals = mealMap[d] ?? [];
    const displayMeals = allMeals.slice(0, MAX_DISPLAY_MEALS);
    const remaining = allMeals.length - MAX_DISPLAY_MEALS;
    if (remaining > 0) displayMeals.push(`+ ${remaining}`);

    days.push({
      date: d,
      meals: displayMeals,
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
        meals: [],
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

  const yearMonth = `${year}${String(month + 1).padStart(2, "0")}`;

  const { data: mealData, isLoading } = useMealByYearMonth(yearMonth);

  const mealMap = useMemo(() => buildMealMap(mealData), [mealData]);

  const days = buildCalendar(year, month, mealMap);
  const weeks: MealDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const handlePrev = () => {
    if (month === 0) { setYear((y) => y - 1); setMonth(11); }
    else setMonth((m) => m - 1);
  };
  const handleNext = () => {
    if (month === 11) { setYear((y) => y + 1); setMonth(0); }
    else setMonth((m) => m + 1);
  };

  return (
    <div className="w-full">
      <h3 className="font-semibold text-[24px] mb-4">급식</h3>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center">
          <span className="px-2 py-1 text-[20px] font-medium text-black">{year}년</span>
          <span className="px-2 py-1 text-[20px] font-medium text-black">
            {String(month + 1).padStart(2, "0")}월
          </span>
        </div>
        <div className="flex items-center gap-5 ml-auto">
          <button
            onClick={handlePrev}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors"
          >
            <ChevronLeft size={16} color="#0D0D0D" strokeWidth={1.5} />
          </button>
          <button
            onClick={handleNext}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors"
          >
            <ChevronRight size={16} color="#0D0D0D" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* 달력 */}
      <div className="w-full">
        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 border-b border-[#D1D1D1]">
          {WEEK_DAYS.map((day, i) => (
            <div
              key={day}
              className="text-base font-medium py-2"
              style={{
                paddingLeft: 12,
                color: i === 0 ? "#FA5353" : i === 6 ? "#4D71FF" : "#0D0D0D",
              }}
            >
              {day}
            </div>
          ))}
        </div>

        {/* 로딩 상태 */}
        {isLoading && (
          <div className="flex justify-center items-center h-40 text-sm text-gray-400">
            급식 정보를 불러오는 중...
          </div>
        )}

        {/* 날짜 행 */}
        {!isLoading &&
          weeks.map((week, wi) => (
            <div key={wi} className="grid grid-cols-7">
              {week.map((day, di) => {
                const isSun = di === 0;
                const isSat = di === 6;
                const opacity = !day.isCurrentMonth ? 0.4 : day.isToday ? 1 : 0.7;
                const dateColor = isSun ? "#FA5353" : isSat ? "#4D71FF" : "#505050";

                const regularMeals = day.meals.filter((m) => !m.trimStart().startsWith("+"));
                const plusItem = day.meals.find((m) => m.trimStart().startsWith("+"));

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
                          flexShrink: 0,
                        }}
                      >
                        {day.date}
                      </span>
                    ) : (
                      <span style={{ fontSize: 16, lineHeight: 1, color: dateColor }}>
                        {day.date}
                      </span>
                    )}

                    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
                      {regularMeals.map((meal, mi) => (
                        <span
                          key={mi}
                          style={{ fontSize: 16, fontWeight: 500, color: "#000000", lineHeight: 1.2 }}
                        >
                          {meal}
                        </span>
                      ))}
                      {plusItem != null && (
                        day.isToday ? (
                          <span
                            style={{
                              fontSize: 12,
                              fontWeight: 500,
                              color: "#ffffff",
                              backgroundColor: "#000000",
                              paddingLeft: 4,
                              paddingRight: 4,
                              paddingTop: 2,
                              paddingBottom: 2,
                              borderRadius: 8,
                              alignSelf: "flex-start",
                              lineHeight: 1.2,
                            }}
                          >
                            {plusItem}
                          </span>
                        ) : (
                          <span style={{ fontSize: 12, fontWeight: 500, color: "#000000", lineHeight: 1.2 }}>
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