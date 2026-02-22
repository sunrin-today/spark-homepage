"use client"
import { useState, Suspense, useEffect } from "react";
import type {Event} from "@/types/events"
import { EventItem } from "@/components/events/EventItem";
import Link from "next/link";
import { SearchBar } from "@/components/ui/search/SearchBar";
import { ResponsivePagination } from "@/components/ui/paging/ResponsivePagination";
import { usePaginationQuery } from "@/hooks/usePaginationQuery";
import { useEventsInfiniteQuery } from "@/lib/queries/events/queries";
import { useSearchParams } from "next/navigation";

function EventsContent() {
    const [searchValue, setSearchValue] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>(useSearchParams().get("search") || "");
    const {page: paginationPage, setPage: setPaginationPage} = usePaginationQuery("page", 1);
    const {data: events} = useEventsInfiniteQuery(
        {limit: 9, query: searchQuery}
    );
    useEffect(() => {
        console.log(events);
    }, [events]);
    return (
        <div className='w-full flex flex-col gap-6 px-3 py-6 md:py-12 md:px-32 justify-center '>
                <div className="w-full flex flex-col gap-3 ">
                    
                    <h1 className="text-black font-semibold text-left text-base md:text-2xl w-full">이벤트</h1>
                        
                    <SearchBar
                        value={searchValue}
                        onChangeText={setSearchValue}
                        placeholder="학생회 이벤트 검색하기"
                        handleSubmit={() => {setSearchQuery(searchValue); setPaginationPage(1)}}
                        buttonText="검색하기"
                        searched={searchQuery}
                    />
                </div>
                { events?.pages[0]?.items?.length ? (
                
                    <ResponsivePagination
                        totalItems={events?.pages[0]?.total || 0}
                        currentPage={paginationPage}
                        totalPages={events?.pages[0]?.totalPages || 1}
                        onPageChange={setPaginationPage}
                        hasMore={events?.pages.length < events?.pages[0]?.totalPages || false}
                        onLoadMore={() => {
                            const nextPage = paginationPage + 1;
                            setPaginationPage(nextPage);
                        }}
                        mobileGridCols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                        desktopGridCols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {events?.pages.flatMap(page => page?.items || []).map((event: Event) => (
                            <Link href={`/events/${event.id}`} key={event.id} className="w-full">   
                                <EventItem key={event.id} event={event} />
                            </Link>
                        ))}
                    </ResponsivePagination>
                )  : (
                <div className="text-center text-gray py-12">
                    <p>이벤트가 없습니다.</p>
                </div>
                )}
            </div>
    )
}

export default function Events() {
    return (
        <Suspense fallback={null}>
            <EventsContent />
        </Suspense>
    )
}