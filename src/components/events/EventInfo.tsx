import type { Event } from "@/types/events"
import Image from "next/image"
import { linkToEvent } from "@/utils/events"
export const EventInfo = ({event}: {event: Event}) => {
    

    return (
        <div className="w-full max-w-4xl mx-auto flex items-center gap-8">
            <Image src={event.thumbnail.url} unoptimized width={629} height={391} alt="event image" className="rounded-[20px] h-[391px] object-cover"/>
            <div className="flex flex-col">
                <div className="flex flex-col gap-3 pb-[13px] text-black">
                    <h4 className="font-semibold text-[32px] text-black">{event.name}</h4>
                    <p className="text-xs text-black">{event.deadline}</p>
                </div>
                <p className="text-xs line-clamp-6 text-black">{event.description}</p>
                <div className="pt-[27px] flex items-center gap-[28px]">
                    <div className="flex gap-[30px]">
                        <i onClick={() => linkToEvent(event.link)} className="bi bi-heart text-2xl"></i>
                        <i onClick={() => linkToEvent(event.link)} className="bi bi-share-fill text-2xl"></i>
                    </div>
                    <button className="w-[234px] h-[49px] text-white bg-black rounded-[100px] text-[18px]" onClick={() => linkToEvent(event.link)}>참여하러가기</button>
                </div>
            </div>
        </div>
    )
}