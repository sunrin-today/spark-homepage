"use client";

import { useEffect, useState } from "react";
import { getMealToday } from "@/lib/api/meal";
import { MealResponse } from "@/types/meal";
import Image from "next/image";

export default function TodayMenu() {
  const [mealData, setMealData] = useState<MealResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        setLoading(true);
        const data = await getMealToday();
        setMealData(data);
        setError(false);
      } catch (err) {
        console.error("Failed to fetch meal:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMeal();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const dayOfWeek = days[date.getDay()];

    return `${year}.${month}.${day} ${dayOfWeek}요일`;
  };

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semi-bold text-xl">오늘의 급식</h3>
      </div>

      <div className="bg-white rounded-[20px] p-6 border border-[#EEE] flex-1 relative">
        {mealData?.date && (
          <div className="absolute top-4 right-6 text-sm text-[#777777]">
            {formatDate(mealData.date)}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-gray-500">로딩 중...</p>
          </div>
        ) : !mealData ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-gray-500">
              급식 정보를 불러올 수 없습니다
            </p>
          </div>
        ) : mealData.rest ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-gray-700 font-medium">
              {mealData.meals[0]?.meal || "휴일"}
            </p>
          </div>
        ) : !mealData.existence || mealData.meals.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-gray-500">
              오늘의 급식 정보가 없습니다
            </p>
          </div>
        ) : (
          <ul className="w-full space-y-3 pt-8">
            {mealData.meals.map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-left">
                <span className="text-base text-gray-900">
                  {item.meal}
                </span>
                {item.code && (
                  <span className="text-xs text-gray-400 bg-[#EEE] rounded-full px-2 py-0.5">
                    {item.code}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex items-center justify-end gap-1 mt-2">
        <span className="text-[12px] text-[#BDBDBD]">
          Powered by Sunrin Today
        </span>
        <Image
          src="/sunrintoday.svg"
          alt="Sunrin Today"
          width={20}
          height={20}
          className="opacity-60"
        />
      </div>
    </div>
  );
}