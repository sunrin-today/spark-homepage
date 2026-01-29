'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import Calendar from '@/components/schedule/Calendar';
import ScheduleList from '@/components/schedule/ScheduleList';
import { useAllSchedules } from '@/lib/queries/schedule/queries';
import { Schedule } from '@/types/schedule';

export default function SchedulePage() {
  const router = useRouter();
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);

  // API를 통해 전체 스케줄 조회
  const { data: schedules = [], isLoading, isError } = useAllSchedules();

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-8 pt-20 lg:pt-8">
        <div className="flex items-center justify-center h-96">
          <p className="text-red-500 text-sm sm:text-base">일정을 불러오는데 실패했습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={() => router.back()}
          className="mb-6 text-gray-700 hover:text-gray-900"
          aria-label="뒤로가기"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex gap-6">
          <div className="flex-1">
            <Calendar
              schedules={schedules}
              selectedSchedule={selectedSchedule}
              onScheduleClick={setSelectedSchedule}
            />
          </div>

          <div className="flex-shrink-0" style={{ marginTop: "68px" }}>
            <ScheduleList
              schedules={schedules}
              onScheduleClick={setSelectedSchedule}
            />
          </div>
        </div>
      </div>

      {selectedSchedule && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setSelectedSchedule(null)}
        />
      )}
    </div>
  );
}