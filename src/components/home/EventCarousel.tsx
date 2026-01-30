"use client";

import { useState } from "react";
import Image from "next/image";
import { useEventsQuery } from "@/lib/queries/events/queries";
import { Event } from "@/types/events";

export default function EventCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // 최근 이벤트 5개 
  const { data: eventsData, isLoading } = useEventsQuery({
    url: "",
    page: 1,
    limit: 5,
  });

  const events = eventsData?.items || [];

  // d-day 연산
  const calculateDaysLeft = (deadline: string): number => {
    const today = new Date();
    const deadlineDate = new Date(deadline);

    today.setHours(0, 0, 0, 0);
    deadlineDate.setHours(0, 0, 0, 0);

    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? events.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === events.length - 1 ? 0 : prev + 1));
  };

  const handleEventClick = (event: Event) => {
    if (event.link && event.isLinkOn) {
      window.open(event.link, "_blank");
    }
  };

  if (!events || events.length === 0) {
    return (
      <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">진행 중인 이벤트가 없습니다</p>
      </div>
    );
  }

  const currentEvent = events[currentIndex];
  const daysLeft = calculateDaysLeft(currentEvent.deadline);

  return (
    <div className="relative w-full h-full rounded-[20px] overflow-hidden">
      <div
        className="relative w-full h-full cursor-pointer"
        onClick={() => handleEventClick(currentEvent)}
      >
        <Image
          src={currentEvent.thumbnail.url}
          alt={currentEvent.name}
          fill
          className="object-cover"
          unoptimized
        />

        {/* d-day 뱃지 */}
        <div
          className="absolute top-4 right-4 text-white text-sm font-medium"
          style={{
            display: "inline-flex",
            padding: "10px 22px",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            borderRadius: "100px",
            background: "rgba(13, 13, 13, 0.50)",
          }}
        >
          {daysLeft > 0
            ? `${daysLeft}일 남음`
            : daysLeft === 0
              ? "오늘 마감"
              : "마감"}
        </div>
      </div>

      <div className="absolute bottom-6 left-6 flex items-center gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="hover:opacity-80 transition-opacity"
          aria-label="이전"
        >
          <Image
            src="/icons/back.svg"
            alt="이전"
            width={24}
            height={24}
            className="invert"
          />
        </button>

        <div className="flex gap-2">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`${index + 1}번 이벤트로 이동`}
            />
          ))}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="hover:opacity-80 transition-opacity"
          aria-label="다음"
        >
          <Image
            src="/icons/forward.svg"
            alt="다음"
            width={24}
            height={24}
            className="invert"
          />
        </button>
      </div>
    </div>
  );
}
