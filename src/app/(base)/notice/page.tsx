'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useNotices } from '@/lib/queries/notices/queries';
import NoticeList from '@/components/notice/NoticeList';
import { SearchBar } from '@/components/ui/search/SearchBar';
import { PaginationBar } from "@/components/ui/paging/PaginationBar";

const ITEMS_PER_PAGE = 10;

function NoticesContent() {
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get('search') || '');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isError } = useNotices(currentPage, ITEMS_PER_PAGE, searchQuery);

  const handleSearch = () => {
    setSearchQuery(searchValue);
    setCurrentPage(1);
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

        <div className="mt-9 px-3 md:px-0 md:rounded-[20px] md:overflow-hidden md:border md:border-gray md:px-[25px] md:py-[25px]">
          {isError ? (
            <div className="py-12 text-center text-red-400 text-sm">
              공지사항을 불러오는데 실패했습니다.
            </div>
          ) : (
            <NoticeList notices={data?.items || []} />
          )}
        </div>

        <div className="px-3 md:px-0">
          <PaginationBar
            totalPages={data?.totalPages || 1}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalItems={data?.total || 0}
          />
        </div>
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