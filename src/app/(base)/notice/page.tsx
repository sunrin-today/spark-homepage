'use client';

import { useState, Suspense, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useNotices } from '@/lib/queries/notices/queries';
import NoticeList from '@/components/notice/NoticeList';
import { SearchBar } from '@/components/ui/search/SearchBar';
import { PaginationBar } from "@/components/ui/paging/PaginationBar";
import { useIsMobile } from '@/hooks/useIsMobile';
import type { Notice } from '@/types/notice';

const ITEMS_PER_PAGE = 10;

function NoticeSentinel({ onIntersect }: { onIntersect: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const onIntersectRef = useRef(onIntersect);
  useEffect(() => { onIntersectRef.current = onIntersect; }, [onIntersect]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onIntersectRef.current(); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className="h-4" />;
}

function NoticesContent() {
  const isMobile = useIsMobile();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get('search') || '');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [currentPage, setCurrentPage] = useState(1);
  const [accumulatedNotices, setAccumulatedNotices] = useState<Notice[]>([]);

  const { data, isError, isFetching } = useNotices(currentPage, ITEMS_PER_PAGE, searchQuery);

  // 검색어 변경 시 초기화
  useEffect(() => {
    setAccumulatedNotices([]);
    setCurrentPage(1);
  }, [searchQuery]);

  useEffect(() => {
    if (!data?.items) return;
    if (isMobile) {
      setAccumulatedNotices((prev) => {
        const newItems = data.items.filter(
          (item) => !prev.some((p) => p.id === item.id)
        );
        return [...prev, ...newItems];
      });
    } else {
      setAccumulatedNotices(data.items);
    }
  }, [data, isMobile]);

  const handleSearch = () => {
    setSearchQuery(searchValue);
  };

  const totalPages = data?.totalPages || 1;
  const totalItems = data?.total || 0;
  const hasMore = currentPage < totalPages;

  const handleLoadMore = () => {
    if (!isFetching && hasMore) {
      setCurrentPage((p) => p + 1);
    }
  };

  return (
    <div className="w-full flex flex-col pt-12 md:py-12 px-[6px] md:px-32 items-center justify-center">
      <div className="w-full flex flex-col mb-6">
        <h1 className="text-black font-semibold text-left text-base md:text-2xl w-full mb-3 px-3 md:px-0">
          공지사항
        </h1>

        <div className="px-3 md:px-0">
          <SearchBar
            value={searchValue}
            onChangeText={setSearchValue}
            placeholder="검색어를 입력해주세요..."
            handleSubmit={handleSearch}
            buttonText="검색하기"
            searched={searchQuery}
          />
        </div>

        {isError ? (
          <div className="py-12 text-center text-red-400 text-sm">
            공지사항을 불러오는데 실패했습니다.
          </div>
        ) : isMobile ? (
          <div className="mt-9 px-3">
            <NoticeList notices={accumulatedNotices} />
            {isFetching && (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400" />
              </div>
            )}
            {/* hasMore이고 로딩 중이 아닐 때만 sentinel 렌더링 → 연속 fetch 방지 */}
            {hasMore && !isFetching && (
              <NoticeSentinel onIntersect={handleLoadMore} />
            )}
          </div>
        ) : (
          <>
            <div className="mt-9 px-3 md:px-0 md:rounded-[20px] md:overflow-hidden md:border md:border-gray md:px-[25px] md:py-[25px]">
              <NoticeList notices={accumulatedNotices} />
            </div>
            <div className="px-3 md:px-0">
              <PaginationBar
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                totalItems={totalItems}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function NoticesPage() {
  return (
    <Suspense fallback={null}>
      <NoticesContent />
    </Suspense>
  );
}