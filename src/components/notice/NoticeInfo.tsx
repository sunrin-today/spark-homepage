"use client";

import Image from 'next/image';
import { useState } from 'react';
import { Notice } from '@/types/notice';

interface NoticeInfoProps {
  notice: Notice;
}

function getFirstKoreanChar(name: string): string {
  const match = name.match(/[가-힣]/);
  return match ? match[0] : name[0] ?? "?";
}

function AuthorAvatar({ avatarUrl, name }: { avatarUrl: string | null; name: string }) {
  const [imgError, setImgError] = useState(false);

  if (!avatarUrl || imgError) {
    return (
      <span className="w-[32px] h-[32px] rounded-full bg-black text-white text-xs font-semibold flex items-center justify-center flex-shrink-0">
        {getFirstKoreanChar(name)}
      </span>
    );
  }

  return (
    <Image
      src={avatarUrl}
      alt={name}
      width={32}
      height={32}
      className="rounded-full object-cover w-[32px] h-[32px]"
      unoptimized
      onError={() => setImgError(true)}
    />
  );
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
    <div className="flex items-center gap-2 md:gap-9 mb-6 text-base flex-wrap">
      <div className="flex items-center gap-3">
        <span className="text-sm md:text-base font-medium text-[#505050]">등록자</span>
        <div className="flex items-center gap-2">
          <AuthorAvatar avatarUrl={authorAvatarUrl} name={authorName} />
          <span className="text-base font-medium text-[#010101]">{authorName}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm md:text-base font-medium text-[#505050]">등록일</span>
        <span className="text-base font-medium text-[#010101]">{formatDate(notice.createdAt)}</span>
      </div>
    </div>
  );
}