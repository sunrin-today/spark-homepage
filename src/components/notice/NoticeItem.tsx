import Link from 'next/link';
import { Notice } from '@/types/notice';

interface NoticeItemProps {
  notice: Notice;
}

export default function NoticeItem({ notice }: NoticeItemProps) {
  return (
    <Link 
      href={`/notice/${notice.id}`}
      className="flex items-center justify-between px-6 py-5 border-b border-[#C0C0C0] hover:bg-gray-50 transition-colors last:border-b-0"
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900">
          {notice.title}
        </p>
      </div>
      <div className="flex items-center gap-12 ml-8 flex-shrink-0">
        <span className="text-sm text-gray-500">
          {notice.createdAt}
        </span>
        <span className="text-sm text-gray-500">
          ({notice.author})
        </span>
      </div>
    </Link>
  );
}