"use client";

import { Plus } from "lucide-react";
import Link from "next/link";

const DUMMY_NOTICES = [
  { id: "1", title: "2026 신입생 도우미 모집안내", date: "2026년 2월 2일" },
  { id: "2", title: "2025 소프트웨어과 학과 발표회", date: "2025년 11월 30일" },
  { id: "3", title: "2024 콘텐츠디자인과 학과 발표회", date: "2024년 11월 30일" },
  { id: "4", title: "빼빼로 데이 이벤트", date: "2025년 11월 11일" },
];

export default function NoticePreview() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-[24px] mb-[17px]">공지사항</h3>
        <Link
          href="/notice"
          className="font-medium text-base flex items-center gap-1"
        >
          더보기 <Plus className="w-4 h-4" />
        </Link>
      </div>

      <div className="flex-1 rounded-[20px] border border-gray overflow-hidden">
        <div className="flex flex-col gap-[10px] px-[25px] py-[25px]">
          {DUMMY_NOTICES.map((notice) => (
            <Link
              key={notice.id}
              href={`/notice/${notice.id}`}
              className="flex flex-col gap-1 px-[20px] py-[15px] bg-[#f9f9f9] rounded-[15px] transition-colors"
            >
              <span className="text-base font-semibold text-black truncate">
                {notice.title}
              </span>
              <span className="text-sm font-medium text-gray">{notice.date}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}