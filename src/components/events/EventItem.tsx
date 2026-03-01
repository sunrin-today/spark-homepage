import { Event } from "@/types/events"
import Image from "next/image" 
import { getStatusText } from "@/utils/date";
export const EventItem = ({event}: {event: Event}) => {
    
    return (
        <div className="w-full flex flex-col justify-center gap-3">
            <div className="relative w-full aspect-[351/218] overflow-hidden rounded-[20px]">
                <Image
                    src={event.thumbnail.url} 
                    unoptimized
                    alt="event image"
                    fill
                    className="object-cover"
                />
                <div className="hidden md:block absolute bottom-0 left-0 right-0 p-4">
                    <div className="bg-[#FEFEFE] text-[#010101] bg-opacity-80 text-xs font-medium px-3 py-2 w-fit rounded-[100px] truncate">{getStatusText(event.startedAt, event.deadline)}</div>
                </div>
            </div>
            <div className="gap-[5px]">
                <h4 className=" text-lg text-black font-semibold w-full truncate">{event.name ? event.name : "제목 없음"}</h4>
                <p className="text-sm font-normal text-[#767676] line-clamp-2">{event.description ? event.description : "내용 없음"}</p>
            </div>
        </div>
    )
}