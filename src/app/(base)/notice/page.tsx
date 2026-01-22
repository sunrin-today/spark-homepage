'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { noticesApi } from '@/lib/api/notice';
import { Notice } from '@/types/notice';
import NoticeList from '@/components/notice/NoticeList';

export default function NoticesPage() {
  const router = useRouter();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const data = await noticesApi.getNotices();
        console.log('Fetched notices:', data);
        setNotices(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch notices:', error);
        setNotices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">로딩 중...</div>
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

        <h1 className="text-2xl font-bold mb-8">공지사항 목록 자세히보기</h1>

        <NoticeList notices={notices} />
      </div>
    </div>
  );
}