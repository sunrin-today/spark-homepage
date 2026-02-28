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

function LostsContent() {
    const isMobile = useIsMobile();
    const searchParams = useSearchParams();
    const [searchValue, setSearchValue] = useState("");
    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
    const { page: currentPage, setPage: setCurrentPage } = usePaginationQuery("page", 1);
    
    const { data: lostsData, isFetching } = useLostsQuery(currentPage, 9, searchQuery);
    
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

            {accumulatedLosts.length > 0 ? (
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
                    <p>{isFetching ? "로딩 중..." : "분실물이 없습니다."}</p>
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