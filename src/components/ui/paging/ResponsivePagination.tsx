"use client";

import { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { PaginationBar } from './PaginationBar';

interface ResponsivePaginationProps {
  totalPages: number;
  totalItems: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  children: React.ReactNode;
  hasMore?: boolean;
  onLoadMore?: () => void;
  loading?: boolean;
  mobileGridCols?: string;
  desktopGridCols?: string;
}

export function ResponsivePagination({
  totalPages,
  totalItems,
  currentPage,
  onPageChange,
  children,
  hasMore = false,
  onLoadMore,
  loading = false,
  mobileGridCols = "grid-cols-1 sm:grid-cols-2",
  desktopGridCols = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
}: ResponsivePaginationProps) {
  const isMobile = useIsMobile();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  // hasMore와 loading을 ref로 관리해서 Observer 콜백에서 최신값 참조
  const hasMoreRef = useRef(hasMore);
  const loadingRef = useRef(loading);

  useEffect(() => { hasMoreRef.current = hasMore; }, [hasMore]);
  useEffect(() => { loadingRef.current = loading; }, [loading]);

  useEffect(() => {
    if (!isMobile || !onLoadMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMoreRef.current &&
          !loadingRef.current
        ) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    const el = loadMoreRef.current;
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, [isMobile, onLoadMore]);

  return (
    <div className='flex flex-col gap-6'>
      <div className={`grid gap-8 ${isMobile ? mobileGridCols : desktopGridCols}`}>
        {children}
      </div>
      
      {isMobile ? (
        <div className="w-full">
          {loading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400" />
            </div>
          )}
          {hasMore && <div ref={loadMoreRef} className="h-4" />}
        </div>
      ) : (
        totalPages > 1 && (
            <PaginationBar
              totalPages={totalPages}
              totalItems={totalItems}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
        )
      )}
    </div>
  );
}