import { Notice } from '@/types/notice';
import NoticeItem from './NoticeItem';

interface NoticeListProps {
  notices: Notice[];
}

export default function NoticeList({ notices }: NoticeListProps) {
  if (notices.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500">
        등록된 공지사항이 없습니다.
      </div>
    );
  }

  return (
    <div className="rounded-lg">
      {notices.map((notice) => (
        <NoticeItem key={notice.id} notice={notice} />
      ))}
    </div>
  );
}