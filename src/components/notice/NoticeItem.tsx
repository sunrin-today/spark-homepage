import Link from "next/link";
import { Notice } from "@/types/notice";

interface NoticeItemProps {
  notice: Notice;
}

export default function NoticeItem({ notice }: NoticeItemProps) {
  const authorName = typeof notice.author === 'string' 
    ? notice.author 
    : notice.author?.name || '알 수 없음';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <Link
      href={`/notice/${notice.id}`}
      className="block bg-white rounded-lg p-6 mb-4 hover:shadow-md transition-shadow border border-gray-200"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900">{notice.title}</h3>
        {notice.isPinned && (
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            고정
          </span>
        )}
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-600">
        <span>{authorName}</span>
        <span>•</span>
        <span>{formatDate(notice.createdAt)}</span>
        <span>•</span>
        <span>조회 {notice.viewCount || notice.views || 0}</span>
      </div>
    </Link>
  );
}