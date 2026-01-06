    "use client"
    import { useState } from "react";
    import type {Event} from "@/types/events"
    import { EventItem } from "@/components/events/EventItem";
    import { event } from "@/lib/dummy";
    import { Tag} from "@/components/ui/search/Tag"
    import Link from "next/link";
    import Image from "next/image";
    import { SearchBar } from "@/components/ui/search/SearchBar";
    const TAGS = ["전체", "진행중", "예정된 이벤트", "끝나가는 이벤트", "종료된 이벤트"]

    export default function Events() {
        const [selectedTag, setSelectedTag] = useState<string>("전체"); 
        const [value, setValue] = useState<string>("");
        
        const handleSubmit = () => {
            //TODO : API 연동
        }
        return (
            <div className="w-full flex flex-col items-center justify-center">
                <div className="w-full flex flex-col mt-36 max-w-[1280px] p-4">
                    <div className="w-full flex flex-col gap-[64px] mb-[64px]">
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
                                        key={tag}
                                        label={tag}
                                        selected={selectedTag === tag}
                                        onClick={() => setSelectedTag(tag)}
                                    />
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center align-items-center">
                        {event.map((event) => (
                            <Link href={`/events/${event.id}`} key={event.id}>   
                                <EventItem key={event.id} event={event} />
                            </Link>

                        ))}
                    </div>
                </div>
            </div>
        )
    }