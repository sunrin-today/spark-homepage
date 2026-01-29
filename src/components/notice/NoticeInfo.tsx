import { Notice } from "@/types/notice";

interface NoticeInfoProps {
  notice: Notice;
}

export default function NoticeInfo({ notice }: NoticeInfoProps) {
  const authorName = typeof notice.author === 'string' 
    ? notice.author 
    : notice.author?.name || '알 수 없음';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}년 ${month}월 ${day}일`;
  };

  return (
    <div className="px-6 py-6 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-black">{notice.title}</h2>

        <div className="flex items-center gap-6 font-regular text-xs text-black">
          <span>{formatDate(notice.createdAt)}</span>
          <span>({authorName})</span>
        </div>
      </div>
    </div>
  );
}