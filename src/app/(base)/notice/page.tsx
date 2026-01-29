'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { useNotices } from '@/lib/queries/notices/queries';
import NoticeList from '@/components/notice/NoticeList';

export default function NoticesPage() {
  const router = useRouter();
  const { data: notices, isLoading, isError, error } = useNotices();

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500">
          공지사항을 불러오는데 실패했습니다.
          <br />
          {error?.message}
        </div>
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

        <h1 className="text-4xl font-semibold mb-8">공지사항 목록 자세히보기</h1>

        <NoticeList notices={notices || []} />
      </div>
    </div>
  );
}