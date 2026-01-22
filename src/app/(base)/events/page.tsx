"use client"
import { useState, useEffect } from "react";
import type {Event} from "@/types/events"
import { EventItem } from "@/components/events/EventItem";
import { Tag} from "@/components/ui/search/Tag"
import Link from "next/link";
import { SearchBar } from "@/components/ui/search/SearchBar";
import { getEvents  } from "@/lib/api/events";
// import { Pagination } from "@/components/ui/pagination/Pagination";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { PaginationBar } from "@/components/ui/paging/PaginationBar";
import { useAuth } from "@/contexts/AuthContexts";
import { usePaginationQuery } from "@/hooks/usePaginationQuery";


const ITEMS_PER_PAGE = 20;
const TAGS = [
    { title: "전체", url: "" },
    { title: "진행중", url: "onGoing" },
    { title: "예정된 이벤트", url: "planned" },
    { title: "끝나가는 이벤트", url: "ending-soon" },
    { title: "종료된 이벤트", url: "finished" }
];

export default function Events() {
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedTag, setSelectedTag] = useState<{ title: string, url: string }>({ title: "전체", url: "" }); 
    const [value, setValue] = useState<string>("");
    const {page: paginationPage, setPage: setPaginationPage} = usePaginationQuery("page", 1);
    
    const handleSubmit = () => {
        //TODO : API 연동
    }
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="w-full flex flex-col mt-36 max-w-[1280px] p-4">
                <div className="w-full flex flex-col gap-16 mb-16">
                    <div className="w-full flex flex-col gap-[15px]">
                        <h1 className="text-black font-semibold text-left text-4xl w-full">학생회 이벤트</h1>
                        <p className="text-[#777777] text-lg">선린학생여러분들의즐거운학교생활을위해spark학생회부원들이준비한이벤트어쩌고</p>
                    </div>
                    <div className="w-full flex flex-col items-center justify-center gap-[30px] pb-16 border-b-2 border-b-lightgray">
                        
                        <SearchBar onChangeText={setValue} placeholder="학생회 이벤트 검색하기"
                            handleSubmit={handleSubmit} buttonColor="main" buttonText="검색하기" className="bg-orange"/>

                        <div className="w-full overflow-x-auto pb-2 border-x border-lightgray sm:border-none">
                            <div className="flex w-max space-x-[15px] px-1">
                            {TAGS.map((tag) => (
                                <Tag
                                    key={tag.title}
                                    label={tag.title}
                                    selected={selectedTag.title === tag.title}
                                    onClick={() => setSelectedTag(tag)}
                                />
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
                { events.length > 0 ? (
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center align-items-center">
                        {events?.map((event) => (
                            <Link href={`/events/${event.id}`} key={event.id}>   
                                <EventItem key={event.id} event={event} />
                            </Link>
                        ))}
                    </div>
                ) : (
                <div className="text-center text-gray py-12">
                    <p>이벤트가 없습니다.</p>
                </div>
                )}
                <PaginationBar totalPages={120} currentPage={paginationPage} onPageChange={setPaginationPage} />
            </div>
        </div>
    )
}