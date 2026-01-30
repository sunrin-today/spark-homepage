"use client";

import Link from "next/link";
import { useRecentNotices } from "@/lib/queries/notices/queries";
import { Plus, ChevronRight } from "lucide-react";

export default function NoticePreview() {
  const { data: notices, isLoading } = useRecentNotices(1, 4);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-xl">공지사항</h3>
        <Link
          href="/notice"
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
        >
          <span>더보기</span>
          <Plus className="w-4 h-4" />
        </Link>
      </div>

      <div
        className="rounded-[20px] border flex-1 overflow-hidden"
        style={{ borderColor: "var(--gray, #C0C0C0)" }}
      >
        {!notices || notices.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-gray-500">공지사항이 없습니다</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 p-4">
            {notices.map((notice) => (
              <Link
                key={notice.id}
                href={`/notice/${notice.id}`}
                className="flex justify-between items-center rounded-[15px] p-4 transition-all hover:bg-[#EEE]"
              >
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  <span className="text-sm font-medium text-black truncate">
                    {notice.title}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatDate(notice.createdAt)}
                  </span>
                </div>
                
                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}