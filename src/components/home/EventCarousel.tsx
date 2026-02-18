"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const DUMMY_EVENTS = [
  { id: "1", dDay: 18, thumbnail: "/example-image/event1.png", href: "/events/1" },
  { id: "2", dDay: 12, thumbnail: "/example-image/event2.png", href: "/events/2" },
  { id: "3", dDay: 7,  thumbnail: "/example-image/event3.png", href: "/events/3" },
  { id: "4", dDay: 3,  thumbnail: "/example-image/event4.png", href: "/events/4" },
  { id: "5", dDay: 25, thumbnail: "/example-image/event5.png", href: "/events/5" },
];

// 앞뒤로 복제 슬라이드 추가
const EXTENDED = [
  DUMMY_EVENTS[DUMMY_EVENTS.length - 1],
  ...DUMMY_EVENTS,
  DUMMY_EVENTS[0],
];

export default function EventCarousel() {
  // extendedIndex: EXTENDED 기준 인덱스 (1 ~ events.length)
  const [extendedIndex, setExtendedIndex] = useState(1);
  const [animated, setAnimated] = useState(true);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const touchStartX = useRef<number | null>(null);
  const isTransitioning = useRef(false);

  const events = DUMMY_EVENTS;
  // 실제 인디케이터용 인덱스
  const currentIndex = extendedIndex - 1;

  const goToExtended = (idx: number) => {
    if (isTransitioning.current) return;
    setAnimated(true);
    setExtendedIndex(idx);
  };

  const goNext = () => goToExtended(extendedIndex + 1);
  const goPrev = () => goToExtended(extendedIndex - 1);

  const resetAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      goToExtended(extendedIndex + 1);
    }, 7000);
  };

  useEffect(() => {
    resetAutoPlay();
    return () => clearInterval(autoPlayRef.current);
  }, [extendedIndex]);

  // 복제 슬라이드 도달 시 애니메이션 없이 진짜 슬라이드로 점프함
  const handleTransitionEnd = () => {
    isTransitioning.current = false;
    if (extendedIndex === 0) {
      setAnimated(false);
      setExtendedIndex(events.length);
    } else if (extendedIndex === EXTENDED.length - 1) {
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

  const current = EXTENDED[extendedIndex];

  return (
    <div className="flex flex-col h-full">
      <h3 className="font-semibold text-[24px] mb-4">이벤트</h3>

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
            transition: animated ? "transform 500ms ease-in-out" : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
          onTransitionStart={handleTransitionStart}
        >
          {EXTENDED.map((event, idx) => (
            <div key={idx} className="relative min-w-full h-full">
              <Link href={event.href} className="block w-full h-full">
                <Image
                  src={event.thumbnail}
                  alt="이벤트썸네일"
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
          {current.dDay}일 남음
        </div>

        {/* 인디케이터 */}
        <div
          className="absolute flex gap-1.5 z-10"
          style={{ bottom: "20px", right: "24px" }}
        >
          {events.map((_, idx: number) => (
            <button
              key={idx}
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                goToExtended(idx + 1);
                resetAutoPlay();
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