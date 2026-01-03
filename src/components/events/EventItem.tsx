import { Event } from "@/types/events"
import Image from "next/image" 
export const EventItem = ({event}: {event: Event}) => {
    
    return (
        <div className="flex flex-col justify-center  w-[315px] gap-3">
            <div className="relative">
                <Image src={ "https://placehold.co/150x150"} unoptimized width={315} height={150} alt="event image"
                className="rounded-[20px] aspect-[5/3] bg-gray"
                />
            </div>
            <div className="gap-1">
                <h4 className=" text-lg text-black w-full">{event.name ? event.name : "제목 없음"}</h4>
                <p className="text-xs font-extralight text-black w-full max-h-[32px] overflow-hidden text-ellipsis">{event.description ? event.description : "내용 없음"}</p>
            </div>
            <div className={`px-[22px] py-[10px] text-xs text-black w-[93px] rounded-[100px] ${event.deadline > new Date().toISOString().split("T")[0] ? "bg-main" : "bg-lightgray"}`}>{new Date().toDateString().split(" ")[2]}일 남음</div>
            
        </div>
    )
}