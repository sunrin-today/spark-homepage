'use client';

import { use } from 'react';
import { useNotice } from '@/lib/queries/notices/queries';
import NoticeInfo from '@/components/notice/NoticeInfo';
import NoticeContent from '@/components/notice/NoticeContent';
import { BackButton } from "@/components/ui/button/BackButton"

interface PageProps {
  params: Promise<{ noticeId: string }>;
}

export default function NoticeDetailPage({ params }: PageProps) {
  const { noticeId } = use(params);
  const { data: notice, error, isLoading } = useNotice(noticeId);

  if (isLoading) {
    return (
      <div className="w-full max-w-5xl flex flex-col gap-6 px-3 py-6 md:py-12 md:px-32 mx-auto min-h-screen">
        <h1 className="flex items-center gap-3 text-[#010101] font-semibold text-left text-base md:text-2xl w-full">
          <BackButton /> 공지사항 상세
        </h1>
      </div>
    );
  }

  if (error || !notice) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#ff0000]">공지사항을 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl flex flex-col gap-6 px-3 py-6 md:py-12 md:px-32 mx-auto min-h-screen">
      <h1 className="flex items-center gap-3 text-[#010101] font-semibold text-left text-base md:text-2xl w-full">
        <BackButton /> 공지사항 상세: {notice.title}
      </h1>

      <NoticeInfo notice={notice} />

      <NoticeContent
        content={notice.content}
        imageUrls={notice.imageUrls}
      />
    </div>
  );
}