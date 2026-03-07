"use client";

import { useState, Suspense, useEffect } from "react";
import { LostItem } from "@/components/losts/LostItem";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ResponsivePagination } from "@/components/ui/paging/ResponsivePagination";
import { SearchBar } from "@/components/ui/search/SearchBar";
import { BackButton } from "@/components/ui/button/BackButton";
import { useLostsQuery } from "@/lib/queries/losts/queries";
import { usePaginationQuery } from "@/hooks/usePaginationQuery";
import { useIsMobile } from "@/hooks/useIsMobile";

function LostItemSkeleton() {
    return (
        <div className="w-full flex flex-col justify-center gap-3 animate-pulse">
            <div className="relative w-full aspect-[323/201] overflow-hidden rounded-[20px] bg-[#E5E5E5]" />
            <div className="gap-1">
                <div className="h-6 w-3/4 rounded bg-[#E5E5E5]" />
                <div className="mt-2 h-4 w-1/2 rounded bg-[#E5E5E5]" />
            </div>
        </div>
    );
}

function LostsContent() {
    const isMobile = useIsMobile();
    const searchParams = useSearchParams();
    const [searchValue, setSearchValue] = useState("");
    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
    const { page: currentPage, setPage: setCurrentPage } = usePaginationQuery("page", 1);
    
    const { data: lostsData, isFetching, isLoading } = useLostsQuery(currentPage, 15, searchQuery);
    
    const [accumulatedLosts, setAccumulatedLosts] = useState<any[]>([]);

    useEffect(() => {
        setAccumulatedLosts([]);
        setCurrentPage(1);
    }, [searchQuery]);

    useEffect(() => {
        if (lostsData?.items) {
            if (isMobile) {
                setAccumulatedLosts((prev) => {

                    const newItems = lostsData.items.filter(
                        (item) => !prev.some((p) => p.id === item.id)
                    );
                    return [...prev, ...newItems];
                });
            } else {
                setAccumulatedLosts(lostsData.items);
            }
        }
    }, [lostsData, isMobile]);

    const totalPages = lostsData?.totalPages || 0;
    const showSkeleton = isLoading || (isFetching && accumulatedLosts.length === 0);

    return (
        <div className="w-full flex flex-col gap-9 px-3 py-6 md:py-12 md:px-32 justify-center">
            <div className="w-full flex flex-col gap-3">
                <h1 className="flex items-center gap-3 text-black font-semibold text-left text-base md:text-2xl w-full">
                    <BackButton/> 학생회 서비스: 월간 분실물함
                </h1>
                
                <SearchBar
                    value={searchValue}
                    placeholder="물건 검색하기"
                    handleSubmit={() => setSearchQuery(searchValue)}
                    onChangeText={setSearchValue}
                    searched={searchQuery}
                />
            </div>

            {showSkeleton ? (
                <ResponsivePagination
                    totalPages={1}
                    totalItems={0}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    hasMore={false}
                    loading={false}
                    mobileGridCols="grid-cols-1 sm:grid-cols-2"
                    desktopGridCols="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                >
                    {Array.from({ length: 15 }).map((_, idx) => (
                        <div key={idx} className="w-full">
                            <LostItemSkeleton />
                        </div>
                    ))}
                </ResponsivePagination>
            ) : accumulatedLosts.length > 0 ? (
                <ResponsivePagination
                    totalPages={totalPages}
                    totalItems={lostsData?.total || 0}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    hasMore={currentPage < totalPages}
                    onLoadMore={() => {
                        if (!isFetching) setCurrentPage(currentPage + 1);
                    }}
                    loading={isFetching}
                    mobileGridCols="grid-cols-1 sm:grid-cols-2"
                    desktopGridCols="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                >
                    {accumulatedLosts.map((lost) => (
                        <Link href={`/losts/${lost.id}`} key={lost.id}>   
                            <LostItem lost={lost} />
                        </Link> 
                    ))}
                </ResponsivePagination>
            ) : (
                <div className="text-center text-gray py-12">
                    <p>분실물이 없습니다.</p>
                </div>
            )}
        </div>
    )
}

export default function Losts() {
    return (
        <Suspense fallback={null}>
            <LostsContent />
        </Suspense>
    )
}