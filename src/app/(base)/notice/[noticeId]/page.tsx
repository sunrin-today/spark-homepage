'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { noticesApi } from '@/lib/api/notice';
import { Notice } from '@/types/notice';
import NoticeInfo from '@/components/notice/NoticeInfo';
import NoticeContent from '@/components/notice/NoticeContent';

export default function NoticeDetailPage() {
  const router = useRouter();
  const params = useParams();
  const noticeId = params.noticeId as string;

  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const data = await noticesApi.getNoticeById(noticeId);
        setNotice(data);
      } catch (error) {
        console.error('Failed to fetch notice:', error);
      } finally {
        setLoading(false);
      }
    };

    if (noticeId) {
      fetchNotice();
    }
  }, [noticeId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  if (!notice) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">공지사항을 찾을 수 없습니다.</div>
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

        <h1 className="text-2xl font-bold mb-8">공지사항 자세히보기</h1>

        <div className="bg-white rounded-lg shadow-sm">
          <NoticeInfo notice={notice} />
          <NoticeContent 
            content={notice.content}
            imageUrl={notice.imageUrl}
          />
        </div>
      </div>
    </div>
  );
}