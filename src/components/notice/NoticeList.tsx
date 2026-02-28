import Link from 'next/link';
import { Notice } from '@/types/notice';

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

  if (!notices || notices.length === 0) {
    return (
      <div className="p-8 text-center text-[#C0C0C0]">
        공지사항이 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 md:gap-[25px]">
      {notices.map((notice) => (
        <Link
          key={notice.id}
          href={`/notice/${notice.id}`}
          className="flex flex-col justify-center gap-[5px] px-5 py-[15px] bg-[#F9F9F9] rounded-[15px] w-full md:w-auto h-[81px] md:h-auto"
        >
          <p className="text-base font-semibold text-black truncate leading-[19px]">
            {notice.title}
          </p>
          <p className="text-sm md:text-sm font-medium text-[#C0C0C0] leading-[17px]">
            {formatDate(notice.createdAt)}
          </p>
        </Link>
      ))}
    </div>
  );
}