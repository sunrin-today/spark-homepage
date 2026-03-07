"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { CalendarItem } from "@/types/calendar";
import { useIsMobile } from "@/hooks/useIsMobile";

interface ScheduleBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  date: { year: number; month: number; day: number } | null;
  items: CalendarItem[];
}

export default function ScheduleBottomSheet({
  isOpen,
  onClose,
  date,
  items,
}: ScheduleBottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const dragStartY = useRef<number | null>(null);
  const currentTranslateY = useRef<number>(0);

  // 데스크탑으로 화면 늘어나면 바텀시트 닫기
  useEffect(() => {
    if (!isMobile && isOpen) {
      onClose();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // 열릴 때 translateY 초기화
      if (sheetRef.current) {
        sheetRef.current.style.transform = "translateY(0)";
        sheetRef.current.style.transition = "transform 300ms ease-out";
      }
      currentTranslateY.current = 0;
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // 모바일에서 헤더 메뉴 열리면 바텀시트 닫기
  useEffect(() => {
    const handler = () => { if (isOpen) onClose(); };
    window.addEventListener("header-menu-open", handler);
    return () => window.removeEventListener("header-menu-open", handler);
  }, [isOpen, onClose]);

  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    dragStartY.current = clientY;
    if (sheetRef.current) {
      sheetRef.current.style.transition = "none";
    }
  };

  const handleDragMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (dragStartY.current === null) return;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const deltaY = clientY - dragStartY.current;
    // 위로 드래그는 막기
    const translateY = Math.max(0, deltaY);
    currentTranslateY.current = translateY;
    if (sheetRef.current) {
      sheetRef.current.style.transform = `translateY(${translateY}px)`;
    }
  };

  const handleDragEnd = () => {
    if (dragStartY.current === null) return;
    dragStartY.current = null;

    if (sheetRef.current) {
      sheetRef.current.style.transition = "transform 300ms ease-out";
    }

    // 100px 이상 내리면 닫기
    if (currentTranslateY.current > 100) {
      onClose();
    } else {
      // 원위치
      if (sheetRef.current) {
        sheetRef.current.style.transform = "translateY(0)";
      }
      currentTranslateY.current = 0;
    }
  };

  if (!date) return null;

  const dateLabel = `${date.year}년 ${String(date.month + 1).padStart(2, "0")}월 ${String(date.day).padStart(2, "0")}일 일정`;

  return (
    <>
      <div
        ref={sheetRef}
        className="fixed bottom-0 left-0 right-0 z-50 bg-[#ffffff] rounded-t-[20px] border-2 border-[#BFBFBF] transition-transform duration-300 ease-out"
        style={{ height: "400px", transform: isOpen ? "translateY(0)" : "translateY(100%)" }}
      >
        <div
          className="flex justify-center pt-2 pb-5 cursor-grab active:cursor-grabbing"
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          <div className="w-[45px] h-[3px] bg-[#A2A2A2] rounded-full" />
        </div>

        <div className="flex items-center justify-between px-[12px] py-5 border-b border-[#EBEBEB]">
          <h2 className="text-base font-semibold text-[#010101]">{dateLabel}</h2>
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center rounded-full transition-colors"
            aria-label="닫기"
          >
            <X size={24} color="#505050" />
          </button>
        </div>

        <div className="overflow-y-auto px-5 pt-5 pb-4" style={{ height: "calc(400px - 90px)" }}>
          {items.length === 0 ? (
            <p className="text-sm text-[#A0A0A0] text-center py-8">일정이 없습니다.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-[6px]">
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-semibold text-[#010101]">{item.title}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}