"use client";

import { useEffect, useState } from "react";
import { getMealToday } from "@/lib/api/meal";
import { MealResponse } from "@/types/meal";

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

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semi-bold text-xl">급식</h3>
      </div>

      <div className="bg-white rounded-[20px] p-6 border border-[#EEE] flex-1">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-gray-500">로딩 중...</p>
          </div>
        ) : error || !mealData ? (
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
          <ul className="w-full space-y-2">
            {mealData.meals.map((item, index) => (
              <li key={index} className="text-sm text-gray-700 text-center">
                {item.meal}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}