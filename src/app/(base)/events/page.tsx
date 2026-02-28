"use client";

import { useState, Suspense, useEffect } from "react";
import type { Event } from "@/types/events";
import { EventItem } from "@/components/events/EventItem";
import Link from "next/link";
import { SearchBar } from "@/components/ui/search/SearchBar";
import { ResponsivePagination } from "@/components/ui/paging/ResponsivePagination";
import { usePaginationQuery } from "@/hooks/usePaginationQuery";
import { useEventsInfiniteQuery } from "@/lib/queries/events/queries";
import { useSearchParams } from "next/navigation";
import { useIsMobile } from "@/hooks/useIsMobile";

function EventsContent() {
    const isMobile = useIsMobile();
    const searchParams = useSearchParams();
    const [searchValue, setSearchValue] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>(searchParams.get("search") || "");
    const { page: paginationPage, setPage: setPaginationPage } = usePaginationQuery("page", 1);
    
    const limit = 9;
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useEventsInfiniteQuery({
        limit,
        query: searchQuery
    });

    const handleSearch = () => {
        setSearchQuery(searchValue);
        setPaginationPage(1);
        refetch();
    };

    const allEvents = data?.pages.flatMap((page) => page?.items || []) || [];

    const startIndex = (paginationPage - 1) * limit;
    const desktopDisplayEvents = allEvents.slice(startIndex, startIndex + limit);

    const totalItems = data?.pages[0]?.total || 0;
    const totalPages = data?.pages[0]?.totalPages || 1;

    return (
        <div className='w-full flex flex-col gap-9 px-3 py-12 md:px-32 justify-center'>
            <div className="w-full flex flex-col gap-3">
                <h1 className="text-black font-semibold text-left text-base md:text-2xl w-full">이벤트</h1>
                <SearchBar
                    value={searchValue}
                    onChangeText={setSearchValue}
                    placeholder="학생회 이벤트 검색하기"
                    handleSubmit={handleSearch}
                    buttonText="검색하기"
                    searched={searchQuery}
                />
            </div>

            {allEvents.length > 0 ? (
                <ResponsivePagination
                    totalItems={totalItems}
                    currentPage={paginationPage}
                    totalPages={totalPages}
                    onPageChange={async (page) => {
                        setPaginationPage(page);
                        if (allEvents.length < page * limit && hasNextPage) {
                            await fetchNextPage();
                        }
                    }}
                    hasMore={hasNextPage}
                    onLoadMore={() => fetchNextPage()}
                    loading={isFetchingNextPage}
                >
                    {(isMobile ? allEvents : desktopDisplayEvents).map((event: Event) => (
                        <Link href={`/events/${event.id}`} key={event.id} className="w-full">
                            <EventItem event={event} />
                        </Link>
                    ))}
                </ResponsivePagination>
            ) : (
                <div className="text-center text-gray py-12">
                    <p>이벤트가 없습니다.</p>
                </div>
            )}
        </div>
    );
}

export default function Events() {
    return (
        <Suspense fallback={null}>
            <EventsContent />
        </Suspense>
    );
}