"use client";

import Link from "next/link";

interface Notice {
  id: string;
  title: string;
  date: string;
  badge?: string;
  badgeColor?: string;
}

interface NoticePreviewProps {
  notice?: Notice[];
}

export default function NoticePreview({
  notice = [
    { id: "1", title: "2026 신입생 도우미 모집안내", date: "2026년 2월 3일" },
    {
      id: "2",
      title: "2025 소프트웨어과 학과발표회",
      date: "2025년 12월 30일",
      badge: "소프트웨어과",
      badgeColor: "rgba(238, 209, 61, 0.30)",
    },
    {
      id: "3",
      title: "2024 콘텐츠디자인과 학과발표회",
      date: "2024년 12월 26일",
      badge: "콘텐츠디자인과",
      badgeColor: "rgba(61, 132, 238, 0.30)",
    },
    { id: "4", title: "빼빼로데이 이벤트", date: "2025년 11월 11일" },
  ],
}: NoticePreviewProps) {
  const displayNotice = notice.slice(0, 4);

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semi-bold text-xl">공지사항</h3>
        <Link
          href="/notice"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          더보기 +
        </Link>
      </div>

      <div
        className="rounded-[20px] border p-4"
        style={{ borderColor: "var(--gray, #C0C0C0)" }}
      >
        {displayNotice.map((notice) => (
          <Link
            key={notice.id}
            href={`/notice/${notice.id}`}
            className="flex flex-col p-4 bg-gray-50 rounded-[10px] hover:shadow transition-shadow gap-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-black">
                {notice.title}
              </span>

              {notice.badge && (
                <span
                  className="px-3 py-1 text-xs rounded-full text-black whitespace-nowrap font-medium"
                  style={{ backgroundColor: notice.badgeColor }}
                >
                  {notice.badge}
                </span>
              )}
            </div>

            <span className="text-xs text-gray-400">{notice.date}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
