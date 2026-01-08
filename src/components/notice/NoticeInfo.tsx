import { Notice } from '@/types/notice';

interface NoticeInfoProps {
  notice: Notice;
}

export default function NoticeInfo({ notice }: NoticeInfoProps) {
  return (
    <div className="border-b border-gray-200 px-6 py-4">
      <div className="flex items-start justify-between">
        <h2 className="text-sm font-normal text-gray-900 flex-1">
          {notice.title}
        </h2>
        <div className="flex items-center gap-6 text-sm text-gray-500 flex-shrink-0 ml-4">
          <span>{notice.createdAt}</span>
          <span>({notice.author})</span>
        </div>
      </div>
    </div>
  );
}