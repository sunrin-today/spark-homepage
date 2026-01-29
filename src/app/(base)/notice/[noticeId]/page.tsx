'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { useNotice } from '@/lib/queries/notices/queries';
import NoticeInfo from '@/components/notice/NoticeInfo';
import NoticeContent from '@/components/notice/NoticeContent';

interface PageProps {
  params: Promise<{ noticeId: string }>;
}

export default function NoticeDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { noticeId } = use(params);

  const { data: notice, isLoading, error } = useNotice(noticeId);

  if (error || !notice) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500">공지사항을 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 pt-16 pb-8">
        <button
          onClick={() => router.back()}
          className="mb-8 text-gray-700 hover:text-gray-900"
          aria-label="뒤로가기"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <h1 className="text-4xl font-semibold mb-8">공지사항 자세히보기</h1>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <NoticeInfo notice={notice} />
          <NoticeContent 
            content={notice.content}
            imageUrls={notice.imageUrls}
          />
        </div>
      </div>
    </div>
  );
}