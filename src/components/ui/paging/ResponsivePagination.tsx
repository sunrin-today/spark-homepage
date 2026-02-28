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
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isMobile || !hasMore || !onLoadMore) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [isMobile, hasMore, loading, onLoadMore]);

  return (
    <div className='flex flex-col gap-6'>
      <div className={`grid gap-8 ${isMobile ? mobileGridCols : desktopGridCols}`}>
        {children}
      </div>
      
      {isMobile ? (
        <div className="w-full">
          {loading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}
          <div ref={loadMoreRef} className="h-4" />
          
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