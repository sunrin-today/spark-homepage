"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useEventsQuery } from "@/lib/queries/events/queries";

export default function EventCarousel() {
  const { data: eventsData } = useEventsQuery({ url: "", page: 1, limit: 5 });
  const events = eventsData?.items ?? [];

  const isSingle = events.length === 1;

  const extended = events.length > 1
    ? [events[events.length - 1], ...events, events[0]]
    : events;

  const [extendedIndex, setExtendedIndex] = useState(isSingle ? 0 : 1);
  const [animated, setAnimated] = useState(true);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const touchStartX = useRef<number | null>(null);
  const isTransitioning = useRef(false);

  const currentIndex = isSingle ? 0 : extendedIndex - 1;

  const goToExtended = (idx: number) => {
    if (isSingle || isTransitioning.current) return;
    setAnimated(true);
    setExtendedIndex(idx);
  };

  const goNext = () => goToExtended(extendedIndex + 1);
  const goPrev = () => goToExtended(extendedIndex - 1);

  const resetAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    if (isSingle) return;
    autoPlayRef.current = setInterval(() => {
      goToExtended(extendedIndex + 1);
    }, 7000);
  };

  useEffect(() => {
    if (events.length === 0) return;
    resetAutoPlay();
    return () => clearInterval(autoPlayRef.current);
  }, [extendedIndex, events.length]);

  useEffect(() => {
    setExtendedIndex(isSingle ? 0 : 1);
  }, [isSingle]);

  const handleTransitionEnd = () => {
    isTransitioning.current = false;
    if (extendedIndex === 0) {
      setAnimated(false);
      setExtendedIndex(events.length);
    } else if (extendedIndex === extended.length - 1) {
      setAnimated(false);
      setExtendedIndex(1);
    }
  };

  const handleTransitionStart = () => {
    isTransitioning.current = true;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? goNext() : goPrev();
    }
    touchStartX.current = null;
  };

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    return Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  if (events.length === 0) {
    return (
      <div className="flex flex-col h-full">
        <h3 className="font-semibold text-[24px] mb-[17px]">이벤트</h3>
        <div className="relative flex-1 rounded-[10px] overflow-hidden bg-gray-100 flex items-center justify-center" style={{ minHeight: "366px" }}>
          <p className="text-gray-400 text-sm">이벤트가 없습니다.</p>
        </div>
      </div>
    );
  }

  const currentEvent = extended[extendedIndex];
  const daysRemaining = getDaysRemaining(currentEvent?.deadline ?? "");

  return (
    <div className="flex flex-col h-full">
      <h3 className="font-semibold text-[24px] mb-[17px]">이벤트</h3>

      <div
        className="relative flex-1 rounded-[10px] overflow-hidden"
        style={{ minHeight: "366px" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex h-full"
          style={{
            transform: `translateX(-${extendedIndex * 100}%)`,
            transition: animated && !isSingle ? "transform 500ms ease-in-out" : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
          onTransitionStart={handleTransitionStart}
        >
          {extended.map((event, idx) => (
            <div key={idx} className="relative min-w-full h-full">
              <Link href={`/events/${event.id}`} className="block w-full h-full">
                <Image
                  src={event.thumbnail.url}
                  alt={event.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </Link>
            </div>
          ))}
        </div>

        {/* D-day 배지 */}
        <div
          className="absolute text-white text-[18px] font-regular px-[22px] py-1.5 rounded-full z-10"
          style={{
            top: "14.5px",
            left: "18px",
            backgroundColor: "rgba(13,13,13,0.5)",
          }}
        >
          {daysRemaining < 0 ? `${Math.abs(daysRemaining)}일 지남` : `${daysRemaining}일 남음`}
        </div>

        {/* 인디케이터 */}
        <div
          className="absolute flex gap-1.5 z-10"
          style={{ bottom: "20px", right: "24px" }}
        >
          {events.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.preventDefault();
                if (!isSingle) {
                  goToExtended(idx + 1);
                  resetAutoPlay();
                }
              }}
              className="rounded-full transition-all"
              style={{
                width: "12px",
                height: "12px",
                backgroundColor:
                  idx === currentIndex % events.length
                    ? "rgba(255,255,255,1)"
                    : "rgba(255,255,255,0.5)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}