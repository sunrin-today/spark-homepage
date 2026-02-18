"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const DUMMY_EVENTS = [
  { id: "1", dDay: 18, thumbnail: "/example-image/event1.png", href: "/events/1" },
];

export default function EventCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const events = DUMMY_EVENTS;
  const current = events[currentIndex];

  const INDICATOR_COUNT = 5;

  return (
    <div className="flex flex-col h-full">
      <h3 className="font-semibold text-[24px] mb-4">이벤트</h3>

      <div
        className="relative flex-1 rounded-[10px] overflow-hidden cursor-pointer"
        style={{ minHeight: "366px" }}
      >
        <Link href={current.href} className="block w-full h-full">
          <Image
            src={current.thumbnail}
            alt="이벤트썸네일"
            fill
            className="object-cover"
            unoptimized
          />
        </Link>

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
          style={{
            bottom: "20px",
            right: "24px",
          }}
        >
          {Array.from({ length: INDICATOR_COUNT }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx < events.length ? idx : 0)}
              className="rounded-full transition-all"
              style={{
                width: "12px",
                height: "12px",
                backgroundColor:
                  idx === currentIndex
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