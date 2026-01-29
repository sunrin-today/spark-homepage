import Link from "next/link";
import { Notice } from "@/types/notice";

interface NoticeListProps {
  notices: Notice[];
}

export default function NoticeList({ notices = [] }: NoticeListProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}년 ${month}월 ${day}일`;
  };

  const getAuthorName = (author: Notice['author']) => {
    if (typeof author === 'string') return author;
    if (author && typeof author === 'object') return author.name;
    return '알 수 없음';
  };

  if (!notices || notices.length === 0) {
    return (
      <div className="bg-white rounded-lg overflow-hidden p-8 text-center text-gray-500">
        공지사항이 없습니다.
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <div>
        {notices.map((notice) => (
          <Link
            key={notice.id}
            href={`/notice/${notice.id}`}
            className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#C0C0C0] transition-colors"
          >
            <div className="col-span-7">
              <p className="text-lg font-semibold text-black line-clamp-2">
                {notice.title}
              </p>
            </div>
            <div className="col-span-2 text-center">
              <p className="text-lg font-regular text-black">
                {formatDate(notice.createdAt)}
              </p>
            </div>
            <div className="col-span-3 text-center">
              <p className="text-lg font-regular text-black">
                ({getAuthorName(notice.author)})
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}