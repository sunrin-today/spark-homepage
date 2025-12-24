"use client"
import { useState } from "react";
import type {Event} from "@/types/events"
import { EventItem } from "@/components/events/EventItem";
import { event } from "@/lib/dummy";
import { Tag} from "@/components/ui/search/Tag"
import Link from "next/link";
import Image from "next/image";
const TAGS = ["전체", "진행중", "예정된 이벤트", "끝나가는 이벤트", "종료된 이벤트"]

export default function Events() {
    const [selectedTag, setSelectedTag] = useState<string>("전체"); 
    
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="w-full flex flex-col mt-36 max-w-[1280px]">
                <div className="w-full flex flex-col gap-[64px] mb-[64px]">
                    <div className="w-full flex flex-col gap-[15px]">
                        <h1 className="text-black font-semibold text-left text-4xl w-full">학생회 이벤트</h1>
                        <p className="text-[#777777] text-lg">선린학생여러분들의즐거운학교생활을위해spark학생회부원들이준비한이벤트어쩌고</p>
                    </div>
                    {/* TODO : search_bar 컴포넌트화 */}
                    <div className="w-full flex flex-col items-center justify-center gap-[30px] pb-16 border-b-2 border-b-lightgray">
                        <div className="w-full">
                            <div className="relative w-full">
                                <Image width={34} height={34} src="/icons/search_gray.svg" alt="search" className="absolute top-[15px] left-[23px]"/>         
                                <div className="flex w-full gap-[50px]">
                                <input type="text" className="bg-lightgray border-[1px] border-gray flex-1 rounded-[100px] px-[25px] py-[15px]" placeholder="학생회 이벤트 검색하기"  />
                                <button className="bg-main text-[18px] text-white px-[62px] py-[19px] rounded-[100px]">검색하기</button>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full justify-start space-x-[15px]">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center align-items-center">
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