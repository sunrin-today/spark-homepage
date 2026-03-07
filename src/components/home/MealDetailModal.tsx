"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { MealResponse } from "@/types/meal";

interface MealDetailModalProps {
  meal: MealResponse | null;
  date: { year: number; month: number; day: number } | null;
  position: { x: number; y: number } | null;
  onClose: () => void;
}

function formatModalTitle(year: number, month: number, day: number): string {
  return `${year}년 ${String(month + 1).padStart(2, "0")}월 ${String(day).padStart(2, "0")}일 급식`;
}

export default function MealDetailModal({ meal, date, position, onClose }: MealDetailModalProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!date || !position) return null;

  const title = formatModalTitle(date.year, date.month, date.day);

  return (
    <div
      className="absolute z-50 bg-[#FFFFFF] rounded-[20px] w-full max-w-[480px] p-4 border-2 border-[#BFBFBF]
        transition-all duration-200 ease-out"
      style={{
        left: position.x,
        top: position.y,
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.95)",
        transformOrigin: "top left",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-[#010101]">{title}</h2>
        <button onClick={onClose} className="flex items-center justify-center w-7 h-7 shrink-0" aria-label="닫기">
          <X size={24} color="#0D0D0D" />
        </button>
      </div>

      <div className="h-px bg-[rgba(0,0,0,0.3)] mb-5" />

      {!meal ? (
        <p className="text-center text-sm text-gray">급식 정보가 없습니다.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {meal.menu.map((item, idx) => (
            <div key={idx} className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xl font-semibold text-[#010101] leading-snug">{item.dishName}</span>
              {item.allergyNumbers.length > 0 && (
                <span className="text-xs text-[#535353] bg-[#EEEEEE] rounded-[20px] px-2 py-0.5 leading-[17px] whitespace-nowrap">
                  {item.allergyNumbers.join(".")}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}