"use client";

import { useState, useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import PaginationBar from './PaginationBar';

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
  mobileGridCols = "grid-cols-2 sm:grid-cols-2 md:grid-cols-3",
  desktopGridCols = "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
}: ResponsivePaginationProps) {
  const isMobile = useIsMobile();
  const [displayedItems, setDisplayedItems] = useState<React.ReactNode[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // 무한 스크롤 로직
  useEffect(() => {
    if (!isMobile) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loading && onLoadMore) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isMobile, hasMore, loading, onLoadMore]);

  useEffect(() => {
    if (isMobile) {
      setDisplayedItems((prev) => {     
        const itemsArray = Array.isArray(children) ? children : [children];
        return itemsArray;
      });
    }
  }, [children, isMobile]);

  if (isMobile) {
    return (
      <div>
        <div className={`grid ${mobileGridCols} gap-8`}>
          {displayedItems}
        </div>
        
        {/* {loading && (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        )} */}
        
        <div ref={loadMoreRef} className="h-1" />
        
        {/* {!hasMore && displayedItems.length > 0 && (
          <div className="text-center text-gray py-4">
            <p>더 이상 항목이 없습니다.</p>
          </div>
        )} */}
      </div>
    );
  }

  return (
    <div>
      <div className={`grid ${desktopGridCols} gap-3`}>
        {children}
      </div>
      {totalPages > 1 && (
      <PaginationBar
        totalPages={totalPages}
        totalItems={totalItems}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
      )}
    </div>
  );
}
