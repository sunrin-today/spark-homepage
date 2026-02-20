"use client"
import { useState, Suspense } from "react";
import type {Event} from "@/types/events"
import { EventItem } from "@/components/events/EventItem";
import { Tag} from "@/components/ui/search/Tag"
import Link from "next/link";
import { SearchBar } from "@/components/ui/search/SearchBar";
import { PaginationBar } from "@/components/ui/paging/PaginationBar";
import { usePaginationQuery } from "@/hooks/usePaginationQuery";
import { useEventsQuery } from "@/lib/queries/events/queries";
import { useSearchParams } from "next/navigation";

const TAGS = [
    { title: "전체", url: "" },
    { title: "진행중", url: "onGoing" },
    { title: "예정된 이벤트", url: "planned" },
    { title: "끝나가는 이벤트", url: "ending-soon" },
    { title: "종료된 이벤트", url: "finished" }
];

function EventsContent() {
    const [selectedTag, setSelectedTag] = useState<{ title: string, url: string }>(TAGS[0]); 
    const [searchValue, setSearchValue] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>(useSearchParams().get("search") || "");
    const {page: paginationPage, setPage: setPaginationPage} = usePaginationQuery("page", 1);
    const {data: events, isLoading} = useEventsQuery(
        {url: selectedTag.url, page: paginationPage, limit: 16, query: searchQuery}
    );
    return (
        <div className="w-full flex flex-col py-12 px-32 items-center justify-center">
                <div className="w-full flex flex-col gap-3 mb-6 ">
                    
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
                { events?.items && events.items.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center align-items-center">
                        {events?.items.map((event: Event) => (
                            <Link href={`/events/${event.id}`} key={event.id}>   
                                <EventItem key={event.id} event={event} />
                            </Link>
                        ))}
                    </div>
                )  : (
                <div className="text-center text-gray py-12">
                    <p>이벤트가 없습니다.</p>
                </div>
                )}
                <PaginationBar totalPages={events?.totalPages || 1} currentPage={paginationPage} onPageChange={setPaginationPage} />
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