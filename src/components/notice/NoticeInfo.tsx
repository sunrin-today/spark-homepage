import Image from 'next/image';
import { Notice } from '@/types/notice';

interface NoticeInfoProps {
  notice: Notice;
}

export default function NoticeInfo({ notice }: NoticeInfoProps) {
  const authorName =
    typeof notice.author === 'string'
      ? notice.author
      : notice.author?.name || '알 수 없음';

  const authorAvatarUrl =
    typeof notice.author === 'string'
      ? null
      : notice.author?.avatarUrl || null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}년 ${month}월 ${day}일`;
  };

  return (
    <div className="flex items-center gap-9 mb-6 text-base">
      <div className="flex items-center gap-3">
        <span className="font-medium text-[#505050]">등록자</span>
        <div className="flex items-center gap-1.5">
          {authorAvatarUrl ? (
            <Image
              src={authorAvatarUrl}
              alt={authorName}
              width={32}
              height={32}
              className="rounded-full object-cover w-[32px] h-[32px]"
              unoptimized
            />
          ) : (
            <div className="w-[32px] h-[32px] rounded-full bg-lightgray flex items-center justify-center text-xs text-gray">
              {authorName.charAt(0)}
            </div>
          )}
          <span className="font-medium text-[#010101]">{authorName}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="font-medium text-[#505050]">등록일</span>
        <span className="font-medium text-[#010101]">{formatDate(notice.createdAt)}</span>
      </div>
    </div>
  );
}