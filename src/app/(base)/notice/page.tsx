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
  const [searchValue, setSearchValue] = useState('');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isError, isLoading } = useNotices(currentPage, ITEMS_PER_PAGE);

  const handleSearch = () => {
    setSearchQuery(searchValue);
    setCurrentPage(1);
  };

  return (
    <div className="w-full flex flex-col py-12 px-32 items-center justify-center">
      <div className="w-full flex flex-col gap-3 mb-6 ">
        <h1 className="text-black font-semibold text-left text-base md:text-2xl w-full">공지사항</h1>  
        <SearchBar
          value={searchValue}
          onChangeText={setSearchValue}
          placeholder="검색어를 입력해주세요..."
          handleSubmit={() => {setSearchQuery(searchValue); setCurrentPage(1)}}
          buttonText="검색하기"
          searched={searchQuery}
        />

        <div className="rounded-[20px] overflow-hidden mt-9 border border-gray px-[25px] py-[25px]">
        {isError ? (
          <div className="py-12 text-center text-red-400 text-sm">
            공지사항을 불러오는데 실패했습니다.
          </div>
        ) : (
          <NoticeList notices={data?.items || []} />
        )}
      </div>

        <PaginationBar 
          totalPages={data?.totalPages || 1} 
          currentPage={currentPage} 
          onPageChange={setCurrentPage}
          totalItems={data?.total || 0}
        />
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