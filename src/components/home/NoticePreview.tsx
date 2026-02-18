"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useRecentNotices } from "@/lib/queries/notices/queries";

export default function NoticePreview() {
  const { data: notices, isLoading } = useRecentNotices(1, 4);

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
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col gap-1 px-[20px] py-[15px] bg-[#f9f9f9] rounded-[15px] animate-pulse"
              >
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/3 mt-1" />
              </div>
            ))
          ) : notices && notices.length > 0 ? (
            notices.map((notice) => (
              <Link
                key={notice.id}
                href={`/notice/${notice.id}`}
                className="flex flex-col gap-1 px-[20px] py-[15px] bg-[#f9f9f9] rounded-[15px] transition-colors"
              >
                <span className="text-base font-semibold text-black truncate">
                  {notice.title}
                </span>
                <span className="text-sm font-medium text-gray">
                  {new Date(notice.createdAt).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </Link>
            ))
          ) : (
            <div className="flex items-center justify-center py-8">
              <p className="text-sm text-gray-400">공지사항이 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}